import { Router } from "express";
import controller from "../controllers/session.controller.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

router.post("/login", passportCall("login"), controller.login);
router.post("/register",  passportCall("register"), controller.register);
router.get("/current", passportCall("current"), controller.current);
router.post("/recover-password", controller.recoverPassword)
router.post("/reset-password", controller.resetPassword)

export default router;
