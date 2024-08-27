import { Router } from "express";
import v1mailRoutes from "./V1/mail";

const router = Router();

// Register versioned routes
router.use("/v1", v1mailRoutes);

export default router;
