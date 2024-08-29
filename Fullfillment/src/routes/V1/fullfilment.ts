
import { fulfillment } from "../../controller/fullfillmetOfPayment";
import { Router } from "express";
const router = Router();



router.post(`/connect`, fulfillment);


export default router;
