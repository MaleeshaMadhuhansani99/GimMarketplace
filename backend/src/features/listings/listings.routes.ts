import { Router } from "express";
import {
    createListing,
  deleteListing,
  getAllListings,
  getListingById,
} from "./listings.controller";
import multer from "multer";
import { authenticate } from "../../middleware/auth";

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
router.delete("/:id", deleteListing);



export default router;