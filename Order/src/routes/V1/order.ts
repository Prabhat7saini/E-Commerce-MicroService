import { updatestatus } from "../../controllers/updateOrderStatus";
import { createOrder } from "../../controllers/createOrder";
import { getOrderById } from '../../controllers/getOrder'
import { Router } from "express";
import {tokenVerification} from '../../middlewares/auth'
const router = Router();

// Define route for creating an order
router.post("/createOrders", tokenVerification,createOrder);
router.get('/getorder/:orderId',getOrderById)
router.put("/updateStatus", updatestatus);

export default router;