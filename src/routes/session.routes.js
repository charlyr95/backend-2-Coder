import { Router } from "express";
import { SessionController as controller } from "../controllers/session.controller.js";
import auth from "../middlewares/auth.middleware.js";
import authRole from "../middlewares/roles.middleware.js";

const router = Router();

router.post("/login", controller.login);
router.post("/register", controller.register);
router.post("/logout", controller.logout);
router.get("/current", controller.current);

// testing protected route
router.get("/protected", auth, controller.protected);
router.get("/admin", auth, authRole("admin"), controller.protected);


export default router;
