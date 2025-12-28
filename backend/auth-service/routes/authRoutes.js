import express from "express";
import { signup, login, logout } from "../controllers/authController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyJWT, logout);

export default router;
