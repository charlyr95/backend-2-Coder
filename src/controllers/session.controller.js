import SessionService from "../service/session.service.js";

class SessionController {
  constructor() {
    this.service = SessionService;
  }
  
  login = async (req, res, next) => {
    try {
      const {user, accessToken} = await this.service.login(req.body.email, req.body.password);
      res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 12 * 60 * 60 * 1000, }); // 12 horas
      return res.status(200).send({ message: "Usuario logueado exitosamente", user });
    } catch (error) {
      res.status(500).send({ message: "Error en el login de usuario", error: error.message });
    }
  };

  register = async (req, res, next) => {
    try {
      const user = await this.service.register(req.body);
      res.status(201).send({ message: "Usuario registrado exitosamente", user });
    } catch (error) {
      res.status(500).send({ message: "Error en el registro de usuario", error: error.message });
    }
  };

  current = async (req, res, next) => {
    try {
      const user = await this.service.currentUser(req.cookies.accessToken);
      res.status(201).send({ message: "Usuario registrado exitosamente", user });
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
    } catch(error) {
      res.status(500).send({ message: "Error al resetear la contraseña", error: error.message });
    }
  }

}

export default new SessionController();