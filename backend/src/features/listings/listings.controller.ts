import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

import { ListingsService } from './listings.service'
import { Category, Condition, SortOption } from './listings.types'
import { sendSuccess, sendError } from '../../utils/apiResponse'

const listingsService = new ListingsService()

const VALID_CONDITIONS: Condition[] = ['New', 'Used']

//getAllListing
export const getAllListings = (req: Request, res: Response) => {
  try {
    const page = Math.max(Number(req.query.page) || 1, 1)
    const limit = Math.max(Number(req.query.limit) || 8, 1)

    const search =
      typeof req.query.search === 'string' ? req.query.search : ''

    const sort =
      typeof req.query.sort === 'string'
        ? (req.query.sort as SortOption)
        : 'newest'

    const category =
      typeof req.query.category === 'string'
        ? (req.query.category as Category)
        : ''

    const minPrice =
      req.query.minPrice !== undefined && req.query.minPrice !== ''
        ? Number(req.query.minPrice)
        : ''

    const maxPrice =
      req.query.maxPrice !== undefined && req.query.maxPrice !== ''
        ? Number(req.query.maxPrice)
        : ''

    const result = listingsService.getAllListings(
      page,
      limit,
      search,
      sort,
      category,
      minPrice,
      maxPrice,
    )

    return sendSuccess(res, 200, result)
  } catch (error) {
    console.error('Error fetching listings:', error)
    return sendError(res, 500, 'Failed to fetch listings')
  }
}

//getListingById
export const getListingById = (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return sendError(res, 400, 'Invalid listing ID')
    }

    const listing = listingsService.getListingById(id)

    if (!listing) {
      return sendError(res, 404, 'Listing not found')
    }

    return sendSuccess(res, 200, { data: listing })
  } catch (error) {
    console.error('Error fetching listing:', error)
    return sendError(res, 500, 'Failed to fetch listing')
  }
}

//createListing
export const createListing = (req: Request, res: Response) => {
  try {
    const { title, description, condition, price, category } = req.body
    const userId = req.user?.userId
    const image = req.file

    if (!userId) {
      if (image) {
        fs.unlinkSync(image.path)
      }

      return sendError(
        res,
        401,
        'Authentication required',
      )
    }

    // Required fields validation
    if (
      !title ||
      !description ||
      !condition ||
      !price ||
      !category
    ) {
      if (image) {
        fs.unlinkSync(image.path)
      }

      return sendError(
        res,
        400,
        'Title, description, condition, price and category are required',
      )
    }

    if (!image) {
      return sendError(res, 400, 'Image is required')
    }

    if (!VALID_CONDITIONS.includes(condition)) {
      fs.unlinkSync(image.path)
      return sendError(res, 400, 'Invalid condition value')
    }

    const numericPrice = Number(price)

    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      fs.unlinkSync(image.path)
      return sendError(res, 400, 'Invalid price')
    }

    const listing = listingsService.createListing(
      userId,
      title,
      description,
      condition as Condition,
      numericPrice,
      category as Category,
      '',
    )

    if (!listing) {
      fs.unlinkSync(image.path)
      return sendError(res, 500, 'Failed to create listing')
    }

    const listingId = listing.id

    const extension = path.extname(image.originalname).toLowerCase()
    const fileName = `${listingId}${extension}`
    const tempPath = image.path

    const finalPath = path.join(
      process.cwd(),
      'public',
      'images',
      fileName,
    )

    fs.renameSync(tempPath, finalPath)

    const imageUrl = `/images/${fileName}`
    listingsService.updateListingImage(listingId, imageUrl)

    const createdListing = listingsService.getListingById(listingId)

    return sendSuccess(res, 201, { data: createdListing })
  } catch (error) {
    console.error('Error creating listing:', error)

    if (req.file) {
      try {
        if (fs.existsSync(req.file.path)) {
          fs.unlinkSync(req.file.path)
        }
      } catch (cleanupError) {
        console.error('Error cleaning uploaded file:', cleanupError)
      }
    }

    return sendError(res, 500, 'Failed to create listing')
  }
}

export const deleteListing = (req: Request, res: Response) => {
  try {
    const userId = req.user?.userId

    if (!userId) {
      return sendError(
        res,
        401,
        'Authentication required',
      )
    }

    const id = Number(req.params.id)

    if (Number.isNaN(id)) {
      return sendError(res, 400, 'Invalid listing ID')
    }

    let deletedListing

    try {
      deletedListing =
        listingsService.deleteListing(
          id,
          userId,
        )
    } catch (error) {
      if (
        error instanceof Error &&
        error.message ===
          'You are not allowed to delete this listing'
      ) {
        return sendError(
          res,
          403,
          'You are not allowed to delete this listing',
        )
      }

      throw error
    }

    if (!deletedListing) {
      return sendError(res, 404, 'Listing not found')
    }

    if (deletedListing.image_url) {
      const imagePath = path.join(
        process.cwd(),
        'public',
        deletedListing.image_url,
      )

      try {
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath)
        }
      } catch (cleanupError) {
        console.error('Error removing listing image:', cleanupError)
      }
    }

    return sendSuccess(res, 200, undefined, 'Listing deleted successfully')
  } catch (error) {
    console.error('Error deleting listing:', error)
    return sendError(res, 500, 'Failed to delete listing')
  }
}