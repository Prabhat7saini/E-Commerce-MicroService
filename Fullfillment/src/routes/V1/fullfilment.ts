
import { fulfillment } from "../../config/fullfillmetOfPayment";
import { Router } from "express";
const router = Router();



router.get(`/connect`, fulfillment);


export default router;
