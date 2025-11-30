import { generateToken } from "../utils/jwt.js";

export class SessionController {
  static login = async (req, res, next) => {
    try {
      if (!req.user) return res.status(401).send({ message: "Credenciales inválidas" });
      const user = req.user;
      delete user.password;
      const accessToken = generateToken(user);
      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1 * 60 * 60 * 1000, });
      res.status(200).send({ message: "Usuario logueado exitosamente", user });
    } catch (error) {
      res.status(500).send({ message: "Error en el login de usuario", error });
    }
  };

  static register = async (req, res, next) => {
    try {
      // Registro manejado por Passport
      if (!req.user) return res.status(500).send({ message: "Error en el registro de usuario" });
      res.status(201).send({ message: "Usuario registrado exitosamente" });
    } catch (error) {
      res.status(500).send({ message: "Error en el registro de usuario", error });
    }
  };

  static current = async (req, res, next) => {
    try {
      const user = req.user;
      if (!user) return res.status(404).send({ message: "Usuario no encontrado" });
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Error al obtener usuario", error });
    }
  };

}
