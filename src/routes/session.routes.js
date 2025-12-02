import { Router } from "express";
import controller from "../controllers/session.controller.js";
import auth from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/roles.middleware.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

// TODO: Falta el passportCall en login, register y current
router.post("/login", controller.login);
router.post("/register", controller.register);
router.get("/current", controller.current);
router.post("/recover-password", controller.recoverPassword)
router.post("/reset-password", controller.resetPassword)

// testing protected route
// router.get("/protected", auth, controller.protected);
// router.get("/admin", auth, authRole("admin"), controller.protected);

export default router;
