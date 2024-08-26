import { Router } from "express";
import v1OrderRoutes from "./V1/order"; 

const router = Router();

// Register versioned routes
router.use("/v1", v1OrderRoutes);


export default router;
