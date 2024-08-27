import { updatestatus } from "../../controllers/updateOrderStatus";
import { createOrder } from "../../controllers/createOrder";
import { Router } from "express";
import {tokenVerification} from '../../middlewares/auth'
const router = Router();

// Define route for creating an order
router.post("/createOrders", tokenVerification,createOrder);
router.put("/updateStatus", updatestatus);

export default router;