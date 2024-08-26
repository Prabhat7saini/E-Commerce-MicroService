// import { createOrder } from "../../controllers/createOrder";
import { createPayment } from "../../controllers/createPayment";
import { Router } from "express";
const router = Router();

// Define route for creating an order
// router.post("/createOrders", createOrder);
router.post("/createPayment", createPayment);
export default router;
