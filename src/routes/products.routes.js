import { Router } from "express";
import { ProductsController as controller } from "../controllers/products.controller.js";

const router = Router();

router.get("/", controller.getProducts);
router.post("/", controller.addProduct);
router.get("/:pid", controller.getProductById);
router.put("/:pid", controller.updateProduct);
router.delete("/:pid", controller.deleteProduct);

export default router;
