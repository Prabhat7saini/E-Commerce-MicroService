
import { createPayment } from "../../controllers/createPayment";
import { tokenVerification } from "../../middlewares/auth";
import { Router } from "express";
const router = Router();


router.post("/createPayment/:orderid",tokenVerification, createPayment);
export default router;
