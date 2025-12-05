import { Router } from "express";
import controller from "../controllers/carts.controller.js";
import { passportCall } from "../middlewares/passportCall.js";
import authRole from "../middlewares/authRole.js";
import { userCart } from "../middlewares/userCart.js";

const router = Router();

// Protected routes
router.post("/", passportCall("current"), controller.addCart); 
router.get("/:cid", passportCall("current"), userCart, controller.getCartById);
router.post("/:cid/product/:pid", passportCall("current"), userCart, controller.addProduct);
router.put("/:cid", passportCall("current"), userCart, controller.updateCartProducts);
router.delete("/:cid", passportCall("current"), userCart, controller.clearCart);
router.put("/:cid/product/:pid", passportCall("current"), userCart, controller.updateProductQuantity);
router.delete("/:cid/product/:pid", passportCall("current"), userCart, controller.deleteProduct);

// Admin route
router.get("/", passportCall("current"), authRole("admin"), controller.getCarts);

export default router;
