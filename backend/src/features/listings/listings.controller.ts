import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

import { ListingsService } from './listings.service'
import {
  Category,
  SortOption,
} from './listings.types'

const listingsService =
  new ListingsService()

// ==========================================
// GET ALL LISTINGS
// ==========================================

export const getAllListings = (
  req: Request,
  res: Response,
) => {
  try {
    const page = Math.max(
      Number(req.query.page) || 1,
      1,
    )

    const limit = Math.max(
      Number(req.query.limit) || 8,
      1,
    )

    const search =
      typeof req.query.search === 'string'
        ? req.query.search
        : ''

    const sort =
      typeof req.query.sort === 'string'
        ? (req.query.sort as SortOption)
        : 'newest'

    const category =
      typeof req.query.category === 'string'
        ? (req.query.category as Category)
        : ''

    const minPrice =
      req.query.minPrice !== undefined &&
      req.query.minPrice !== ''
        ? Number(req.query.minPrice)
        : ''

    const maxPrice =
      req.query.maxPrice !== undefined &&
      req.query.maxPrice !== ''
        ? Number(req.query.maxPrice)
        : ''

    const result =
      listingsService.getAllListings(
        page,
        limit,
        search,
        sort,
        category,
        minPrice,
        maxPrice,
      )

    res.status(200).json(result)
  } catch (error) {
    console.error(
      'Error fetching listings:',
      error,
    )

    res.status(500).json({
      success: false,
      message: 'Failed to fetch listings',
    })
  }
}

// ==========================================
// GET LISTING BY ID
// ==========================================

export const getListingById = (
  req: Request,
  res: Response,
) => {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid listing ID',
      })
    }

    const listing =
      listingsService.getListingById(id)

    if (!listing) {
      return res.status(404).json({
        success: false,
        message: 'Listing not found',
      })
    }

    return res.status(200).json({
      success: true,
      data: listing,
    })
  } catch (error) {
    console.error(
      'Error fetching listing:',
      error,
    )

    return res.status(500).json({
      success: false,
      message: 'Failed to fetch listing',
    })
  }
}

// ==========================================
// CREATE LISTING
// ==========================================

export const createListing = (
  req: Request,
  res: Response,
) => {
  try {
    const {
      title,
      description,
      condition,
      price,
      category,
    } = req.body

    const image = req.file

    // ----------------------------
    // Validate required fields
    // ----------------------------

    if (
      !title ||
      !description ||
    !condition ||
      !price ||
      !category
    ) {
      // Remove uploaded file if validation fails
      if (image) {
        fs.unlinkSync(image.path)
      }

      return res.status(400).json({
        success: false,
        message:
          'Title, description, price and category are required',
      })
    }

    // ----------------------------
    // Validate image
    // ----------------------------

    if (!image) {
      return res.status(400).json({
        success: false,
        message: 'Image is required',
      })
    }

    // ----------------------------
    // Validate price
    // ----------------------------

    const numericPrice = Number(price)

    if (
      Number.isNaN(numericPrice) ||
      numericPrice < 0
    ) {
      fs.unlinkSync(image.path)

      return res.status(400).json({
        success: false,
        message: 'Invalid price',
      })
    }

    // ----------------------------
    // Create listing first
    // ----------------------------

    const listing =
      listingsService.createListing(
        title,
        description,
        condition,
        numericPrice,
        category as Category,
        '',
      )

    if (!listing) {
      fs.unlinkSync(image.path)

      return res.status(500).json({
        success: false,
        message: 'Failed to create listing',
      })
    }

    // ----------------------------
    // Get generated listing ID
    // ----------------------------

    const listingId = listing.id

    // ----------------------------
    // Create final image filename
    // ----------------------------

    const extension = path
      .extname(image.originalname)
      .toLowerCase()

    const fileName =
      `${listingId}${extension}`

    // Temporary file created by Multer
    const tempPath = image.path

    // Final path
    const finalPath = path.join(
      process.cwd(),
      'public',
      'images',
      fileName,
    )

    // ----------------------------
    // Move image
    // ----------------------------

    fs.renameSync(
      tempPath,
      finalPath,
    )

    // ----------------------------
    // Save image URL
    // ----------------------------

    const imageUrl =
      `/images/${fileName}`

    listingsService.updateListingImage(
      listingId,
      imageUrl,
    )

    // ----------------------------
    // Get final listing
    // ----------------------------

    const createdListing =
      listingsService.getListingById(
        listingId,
      )

    return res.status(201).json({
      success: true,
      data: createdListing,
    })
  } catch (error) {
    console.error(
      'Error creating listing:',
      error,
    )

    // If Multer uploaded a file but
    // something failed afterward,
    // clean it up.
    if (req.file) {
      try {
        if (
          fs.existsSync(req.file.path)
        ) {
          fs.unlinkSync(req.file.path)
        }
      } catch (cleanupError) {
        console.error(
          'Error cleaning uploaded file:',
          cleanupError,
        )
      }
    }

    return res.status(500).json({
      success: false,
      message: 'Failed to create listing',
    })
  }
}