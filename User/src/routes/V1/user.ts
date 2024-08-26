// import { createOrder } from "../../controllers/createOrder";
import { signUp,login } from "../../controllers/auth";
import { Router } from "express";
const router = Router();

// Define route for creating an order
// router.post("/createOrders", createOrder);
router.post("/signup", signUp);
router.post("/login", login);
export default router;
