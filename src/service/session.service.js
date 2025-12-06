import UserRepository from "../repository/user.repository.js";
import { generateToken, verifyToken } from "../utils/jwt.js";
import { isValidPassword, createHash } from "../utils/hashPassword.js";
import transporter from "../utils/nodeMailer.js";
import UserDto from "../dto/user.dto.js";
class SessionService {
  constructor() {
    this.repository = UserRepository;
  }

  async login(email, password) {
    if (!email || !password) throw new Error("Email y contraseña son requeridos");
    const user = await this.repository.getUserByEmail(email);
    if (!user) throw new Error("Credenciales inválidas");
    const isValid = isValidPassword(user.password, password);
    if (!isValid) throw new Error("Credenciales inválidas");
    const accessToken = generateToken(user);
    if (!accessToken) throw new Error("Error al generar el token de acceso");
    return { user: new UserDto(user), accessToken };
  }

  async register(userData) {
    const { email, password } = userData;
    if (!email || !password) throw new Error("Email y contraseña son requeridos");
    const existingUser = await this.repository.getUserByEmail(email);
    if (existingUser) throw new Error("El mail no es válido o ya está registrado");
    userData.password = createHash(password);
    const newUser = await this.repository.createUser(userData);
    return new UserDto(newUser);
  }

  async currentUser(accessToken) {
    if (!accessToken) throw new Error("Token no proporcionado");
    const jwtPayload = verifyToken(accessToken);
    if (!jwtPayload) throw new Error("Token inválido o expirado");
    const user = await this.repository.getUserByEmail(jwtPayload.email);
    if (!user) throw new Error("Usuario no encontrado");
    return new UserDto(user);
  }

  async recoverPassword(email) {
    if (!email) throw new Error("Email es requerido");
    const user = await this.repository.getUserByEmail(email);
    if (!user) throw new Error("El correo no está registrado");
    const token = generateToken(user, "15m"); // Token válido por 15 minutos
    const resetLink = `http://localhost:8080/api/session/reset-password?token=${token}`;
    const mailOptions = {
      from: '"Ecommerce 2.0" <no-reply@mail.com>',
      to: email,
      subject: "Password Recovery",
      html: `<p>Este es una URL API para resetear tu contraseña, utilice método POST en la siguiente URL:</p>
      <p>${resetLink}</p><p>body:</p><p>{ "password": "nuevaContraseña" }</p>`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }

  async resetPassword(token, newPassword) {
    if (!token || !newPassword) throw new Error("Token y nueva contraseña son requeridos");
    const decoded = verifyToken(token);
    if (!decoded) throw new Error("Token inválido o expirado");
    const user = await this.repository.getUserByEmail(decoded.email);
    if (!user) throw new Error("Usuario no encontrado");
    if (isValidPassword(user.password, newPassword)) throw new Error("La nueva contraseña debe ser diferente a la anterior");
    newPassword = createHash(newPassword);
    const updatedUser = await this.repository.updateUser(user._id, {
      password: newPassword,
    });
    return new UserDto(updatedUser);
  }
}

export default new SessionService();
