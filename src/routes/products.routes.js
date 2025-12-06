import { Router } from "express";
import controller from "../controllers/products.controller.js";
import authRole from "../middlewares/authRole.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

// Public routes
router.get("/", controller.getProducts)
router.get("/:pid", controller.getProductById);

// Admin routes
router.post("/",  passportCall("current"), authRole("admin"), controller.addProduct);
router.put("/:pid", passportCall("current"), authRole("admin"), controller.updateProduct);
router.delete("/:pid", passportCall("current"), authRole("admin"), controller.deleteProduct);

export default router;
