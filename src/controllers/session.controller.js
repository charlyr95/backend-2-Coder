import SessionService from "../service/session.service.js";
import UserDto from "../dto/user.dto.js";

class SessionController {
  constructor() {
    this.service = SessionService;
  }

  login = async (req, res, next) => {
    try {
      // Login con Passport
      const { user } = req;
      if (!user) throw new Error("Error en el login del usuario");
      if (!user.accessToken) throw new Error("Token no encontrado");
      res.cookie("accessToken", user.accessToken, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, }); // 12 horas
      return res.status(200).send({ message: "Usuario logueado exitosamente", user: new UserDto(user)});
    } catch (error) {
      res.status(500).send({ message: "Error en el login de usuario", error: error.message });
    }
  };

  register = async (req, res, next) => {
    try {
      // Registro con Passport
      const { user } = req;
      if (!user) throw new Error("Error en el registro del usuario");
      res.status(200).send({ message: "Usuario registrado exitosamente", user: new UserDto(user) });
    } catch (error) {
      res.status(500).send({ message: "Error en el registro de usuario", error: error.message });
    }
  };

  current = async (req, res, next) => {
    try {
      // Obtener usuario actual con Passport
      const { user } = req;
      if (!user) throw new Error("Usuario no autenticado");
      res.status(200).send({ message: "Usuario obtenido exitosamente", user: new UserDto(user) });
    } catch (error) {
      res.status(500).send({ message: "Error en el registro de usuario", error: error.message });
    }
  };

  recoverPassword = async (req, res, next) => {
    try {
      const { email } = req.body;
      await this.service.recoverPassword(email);
      res.status(200).send({ message: "Email para recuperación de contraseña enviado" });
    } catch (error) {
      res.status(500).send({ message: "Error al iniciar recuperación de contraseña", error: error.message });
    }
  }

  resetPassword = async (req, res, next) => {
    try {
      const result = await this.service.resetPassword(req.query.token, req.body.password);
      res.status(200).send({ message: "Contraseña reseteada exitosamente" });
    } catch (error) {
      res.status(500).send({ message: "Error al resetear la contraseña", error: error.message });
    }
  }

}

export default new SessionController();