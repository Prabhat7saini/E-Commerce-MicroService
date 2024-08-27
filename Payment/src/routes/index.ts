import { Router } from "express";
import v1PaymentRoutes from "./V1/payment";

const router = Router();


router.use("/v1", v1PaymentRoutes);

export default router;
