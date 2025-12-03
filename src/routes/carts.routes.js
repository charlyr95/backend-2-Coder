import { Router } from "express";
import controller from "../controllers/carts.controller.js";
import authRole from "../middlewares/authRole.js"

const router = Router();

router.get("/", controller.getCarts);
router.get("/:cid", controller.getCartById);
router.post("/", controller.addCart);
router.post("/:cid/product/:pid", authRole("admin"), controller.addProduct);
router.delete("/:cid/product/:pid", authRole("admin"), controller.deleteProduct);
router.put("/:cid", authRole("admin"), controller.updateCartProducts);
router.put("/:cid/product/:pid", authRole("admin"), controller.updateProductQuantity);
router.delete("/:cid", authRole("admin"), controller.clearCart);

export default router;
