import { Request, Response } from "express";
import { ListingsService } from "./listings.service";
import { db } from "../../config/database";

const listingsService = new ListingsService();

export const getAllListings = (req: Request, res: Response) => {
  const page = Math.max(Number(req.query.page) || 1, 1);
  const limit = Math.max(Number(req.query.limit) || 8, 1);

  const result = listingsService.getAllListings(page, limit);

  res.json(result);
};

export const getListingById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid listing ID",
      });
    }

    const listing = listingsService.getListingById(id);

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: "Listing not found",
      });
    }

    res.status(200).json({
      success: true,
      data: listing,
    });
  } catch (error) {
    console.error("Error fetching listing:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch listing",
    });
  }
};