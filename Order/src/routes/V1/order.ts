import { updatestatus } from "../../controllers/updateOrderStatus";
import { createOrder } from "../../controllers/createOrder";
import { Router } from "express";
const router = Router();

// Define route for creating an order
router.post("/createOrders", createOrder);
router.put("/updateStatus", updatestatus);

export default router;