import { db } from '../../config/database'
import {
  Category,
  Listing,
  SortOption,
} from './listings.types'

export class ListingsService {
  // ==========================================
  // GET ALL LISTINGS
  // ==========================================

  getAllListings(
    page: number,
    limit: number,
    search: string = '',
    sort: SortOption = 'newest',
    category: Category | '' = '',
    minPrice: number | '' = '',
    maxPrice: number | '' = '',
  ) {
    const offset =
      (page - 1) * limit

    const conditions: string[] = []
    const params: unknown[] = []

    // Search
    if (search.trim()) {
      conditions.push(`
        (
          title LIKE ?
          OR description LIKE ?
        )
      `)

      const searchValue =
        `%${search.trim()}%`

      params.push(
        searchValue,
        searchValue,
      )
    }

    // Category
    if (category) {
      conditions.push(
        'category = ?',
      )

      params.push(category)
    }

    // Minimum price
    if (minPrice !== '') {
      conditions.push(
        'price >= ?',
      )

      params.push(minPrice)
    }

    // Maximum price
    if (maxPrice !== '') {
      conditions.push(
        'price <= ?',
      )

      params.push(maxPrice)
    }

    // WHERE clause
    const whereClause =
      conditions.length > 0
        ? `WHERE ${conditions.join(' AND ')}`
        : ''

    // Sort mapping
    const sortMap: Record<
      SortOption,
      string
    > = {
      newest: 'created_at DESC',
      oldest: 'created_at ASC',
      price_asc: 'price ASC',
      price_desc: 'price DESC',
    }

    const orderBy =
      sortMap[sort] ??
      sortMap.newest

    // Get listings
    const listings = db
      .prepare(`
        SELECT *
        FROM listings
        ${whereClause}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `)
      .all(
        ...params,
        limit,
        offset,
      )

    // Get total count
    const total = db
      .prepare(`
        SELECT COUNT(*) as count
        FROM listings
        ${whereClause}
      `)
      .get(
        ...params,
      ) as { count: number }

    const totalPages =
      Math.ceil(
        total.count / limit,
      )

    return {
      data: listings,

      pagination: {
        page,
        limit,
        total: total.count,
        totalPages,
      },
    }
  }

  // ==========================================
  // GET LISTING BY ID
  // ==========================================

  getListingById(
    id: number,
  ): Listing | undefined {
    return db
      .prepare(`
        SELECT *
        FROM listings
        WHERE id = ?
      `)
      .get(id) as Listing | undefined
  }

  // ==========================================
  // CREATE LISTING
  // ==========================================

  createListing(
    title: string,
    description: string,
    condition: string,
    price: number,
    category: Category,
    imageUrl: string
  ) {
    const result = db
      .prepare(`
        INSERT INTO listings (
          title,
          description,
          condition,
          price,
          category,
          image_url
        )
        VALUES (?, ?, ?, ?, ?, ?)
      `)
      .run(
        title,
        description,
        condition,
        price,
        category,
        imageUrl,
      )

    const listingId =
      Number(result.lastInsertRowid)

    return this.getListingById(
      listingId,
    )
  }

  // ==========================================
  // UPDATE LISTING IMAGE
  // ==========================================

  updateListingImage(
    id: number,
    imageUrl: string,
  ) {
    db.prepare(`
      UPDATE listings
      SET image_url = ?
      WHERE id = ?
    `).run(
      imageUrl,
      id,
    )
  }
}