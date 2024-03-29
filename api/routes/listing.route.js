import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controller/listing.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createListing);
router.delete("/delete/:id", verifyUser, deleteListing);
router.post("/update/:id", verifyUser, updateListing);
router.get("/:id", verifyUser, getListing);

export default router;
