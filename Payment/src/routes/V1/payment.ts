
import { createPayment } from "../../controllers/createPayment";
import { Router } from "express";
const router = Router();


router.post("/createPayment", createPayment);
export default router;
