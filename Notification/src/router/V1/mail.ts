import { sendEmail } from "../../controllers/sendmail";
import { Router } from "express";
const router = Router();

// Define route for creating an order
router.get("/sendmail", sendEmail);


export default router;
