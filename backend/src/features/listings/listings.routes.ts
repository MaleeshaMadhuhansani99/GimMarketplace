import { Router } from "express";
import {
    createListing,
  deleteListing,
  getAllListings,
  getListingById,
} from "./listings.controller";
import multer from "multer";
import { authenticate } from "../../middleware/auth";
import { getMe } from "../auth/auth.controller";

const router = Router();

const upload = multer({
  dest: 'public/images/temp',
})

router.get("/", getAllListings);
router.get("/:id", getListingById);
router.post(
  '/create',
  authenticate,
  upload.single('image'),
  createListing,
)
router.delete("/:id", authenticate, deleteListing);
router.get('/me', authenticate, getMe)



export default router;