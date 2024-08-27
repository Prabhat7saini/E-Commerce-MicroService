import { Router } from "express";
import v1fullfillmentRoutes from "./V1/fullfilment";

const router = Router();

// Register versioned routes
router.use("/v1", v1fullfillmentRoutes);

export default router;
