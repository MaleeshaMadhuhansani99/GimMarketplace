import { Request, Response } from "express";
import { ListingsService } from "./listings.service";

const listingsService = new ListingsService();

export const getAllListings = (req: Request, res: Response) => {
  try {
    const listings = listingsService.getAllListings();

    res.status(200).json({
      success: true,
      data: listings,
    });
  } catch (error) {
    console.error("Error fetching listings:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch listings",
    });
  }
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