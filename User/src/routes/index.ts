import { Router } from "express";
import v1authRoutes from "./V1/user";

const router = Router();

// Register versioned routes
router.use("/v1", v1authRoutes);

export default router;
