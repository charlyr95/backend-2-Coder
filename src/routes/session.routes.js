import { Router } from "express";
import { SessionController as controller } from "../controllers/session.controller.js";
import auth from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/roles.middleware.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

router.post("/login", passportCall("login"), controller.login);
router.post("/register", passportCall("register"), controller.register);
router.get("/current", passportCall("current"), controller.current);

// testing protected route
// router.get("/protected", auth, controller.protected);
// router.get("/admin", auth, authRole("admin"), controller.protected);

export default router;
