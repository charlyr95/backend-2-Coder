import { Router } from "express";
import controller from "../controllers/carts.controller.js";
import { passportCall } from "../middlewares/passportCall.js";
import authRole from "../middlewares/authRole.js";

const router = Router();

// Protected routes
router.get("/:cid", passportCall("current"), controller.getCartById);
router.post("/", passportCall("current"), controller.addCart);
router.post("/:cid/product/:pid", passportCall("current"), controller.addProduct);
router.put("/:cid", passportCall("current"), controller.updateCartProducts);
router.delete("/:cid", passportCall("current"), controller.clearCart);
router.put("/:cid/product/:pid", passportCall("current"), controller.updateProductQuantity);
router.delete("/:cid/product/:pid", passportCall("current"), controller.deleteProduct);

// Admin route
router.get("/", passportCall("current"), authRole("admin"), controller.getCarts);

export default router;
