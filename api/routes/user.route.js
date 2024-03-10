import express from "express";
import { user, updateUser } from "../controller/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", user);
router.post("/update/:id", verifyUser, updateUser);

export default router;
