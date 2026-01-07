// import express from "express";
// import { signup, login, logout } from "../controllers/authController.js";
// import { verifyJWT } from "../middleware/verifyJWT.js";

// const router = express.Router();

// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/logout", verifyJWT, logout);

// export default router;
import express from "express";
import { Signup, Login, logout, getMe} from "../controllers/authController.js";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

router.post("/Signup", Signup);
router.post("/Login", Login);
router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getMe);

export default router;
