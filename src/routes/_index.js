import { Router } from "express";
import productRoutes from "./products.routes.js";
import cartRoutes from "./carts.routes.js";

const router = Router();
router.use("/products", productRoutes);
router.use("/carts", cartRoutes);

export default router;