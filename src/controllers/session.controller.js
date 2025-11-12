import UserDao from "../dao/user.dao.js";
import { createHash, isValidPassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwt.js";
 
export class SessionController {
  static dao = UserDao;

  static login = async (req, res, next) => {
    try {
      // Valida body
      if (!req.body) return res.status(400).send("Faltan credenciales");

      // Valida campos
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("Faltan credenciales");

      // Valida usuario
      const user = await UserDao.getUserByEmail(email, true);
      if (!user) return res.status(401).send("Credenciales inválidas");
      
      // Valida contraseña
      if (!isValidPassword(user.password, password))
        return res.status(401).send("Credenciales inválidas");

      // Genera token
      const accessToken = generateToken(user);

      // Token expires 1 hours
      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000 });
      await res
        .status(200)
        .send({ message: "Usuario logueado exitosamente", accessToken });
    } catch (error) {
      next(error);
    }
  };

  static register = async (req, res, next) => {
    try {
      // Valida body
      if (!req.body) return res.status(400).send("Faltan credenciales");
      const { email, password, first_name, last_name, age, role, cart} = req.body;

      // Campos obligatorios
      if (!email || !password)
        return res.status(400).send("Faltan credenciales");

      // Verifica si el usuario ya existe
      const existingUser = await UserDao.getUserByEmail(email);
      if (existingUser) return res.status(409).send("El usuario ya existe");

      // Registra el usuario
      const user = { email, password: createHash(password), first_name, last_name, age, role, cart };
      const newUser = await UserDao.createUser(user);
      await res.status(201).send("Usuario registrado exitosamente");
    } catch (error) {
      next(error);
    }
  };

  static logout = async (req, res, next) => {
    try {
      // Desloguea al usuario (simulado)
      await res.send("Usuario deslogueado exitosamente");
    } catch (error) {
      next(error);
    }
  };

  static current = async (req, res, next) => {
    try {
      // Devuelve información del usuario de la sesión
      await res.send("Información del usuario de la sesión (simulado)");
    } catch (error) {
      next(error);
    }
  };

  static protected = async (req, res, next) => {
    try {
      // Ruta protegida
      await res.send("Acceso a ruta protegida exitoso (simulado)");
    } catch (error) {
      next(error);
    }
  };
}
