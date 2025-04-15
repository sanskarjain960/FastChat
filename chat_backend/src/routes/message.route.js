import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import { getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/users", protectRoute,getUsersForSidebar);
router.get("/:id", protectRoute,getMessages);
router.post("/send/:id", protectRoute,upload.single("image"),sendMessage);

export default router;
