import { Router } from "express";
import controller from "../controllers/carts.controller.js";
import { passportCall } from "../middlewares/passportCall.js";

const router = Router();

// Public routes
router.get("/", controller.getCarts);
router.get("/:cid", controller.getCartById);

// Protected routes
router.post("/", passportCall("current"), controller.addCart);
router.post("/:cid/product/:pid", passportCall("current"), controller.addProduct);
router.put("/:cid", passportCall("current"), controller.updateCartProducts);
router.delete("/:cid", passportCall("current"), controller.clearCart);
router.put("/:cid/product/:pid", passportCall("current"), controller.updateProductQuantity);
router.delete("/:cid/product/:pid", passportCall("current"), controller.deleteProduct);

export default router;
