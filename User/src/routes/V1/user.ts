
import { signUp,login } from "../../controllers/auth";
import { Router } from "express";
const router = Router();

router.post("/signup", signUp);
router.post("/login", login);
export default router;
