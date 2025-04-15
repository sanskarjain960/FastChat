import express from "express";
import { checkAuth, googleLogin, login, logout, signup } from "../controllers/auth.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { updateProfile } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);
router.put("/update-profile",protectRoute,upload.single("profileImg"), updateProfile)
router.get("/check", protectRoute,checkAuth);
router.post('/auth/google', googleLogin);
export default router;