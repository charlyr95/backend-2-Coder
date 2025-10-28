export class SessionController {
  static users = [];

  static login = async (req, res, next) => {
    try {
      // Valida body
      if (!req.body) return res.status(400).send("Faltan credenciales");

      // Valida campos
      const { email, password } = req.body;
      if (!email || !password)
        return res.status(400).send("Faltan credenciales");

      // Valida usuario
      const user = this.users.find((u) => u.email === email);
      if (!user) return res.status(401).send("Credenciales inválidas");

      // Valida contraseña
      if (user.password !== password)
        return res.status(401).send("Credenciales inválidas");

      // Genera token (simulado)
      const accessToken = "token-simulado";
      const refreshToken = "refresh-token-simulado";

      // Token expires 2 hours
      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });
      res.cookie("refreshToken", refreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
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
      const { email, password } = req.body;

      // Valida campos
      if (!email || !password)
        return res.status(400).send("Faltan credenciales");

      // Verifica si el usuario ya existe
      const existingUser = this.users.find((u) => u.email === email);
      if (existingUser) return res.status(409).send("El usuario ya existe");

      // Registra el usuario
      this.users.push({ email, password });
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
