import { db } from '../../config/database'
import { Category, Condition, Listing, SortOption } from './listings.types'

export class ListingsService {
  getAllListings(
    page: number,
    limit: number,
    search: string = '',
    sort: SortOption = 'newest',
    category: Category | '' = '',
    minPrice: number | '' = '',
    maxPrice: number | '' = '',
  ) {
    const offset = (page - 1) * limit

    const conditions: string[] = []
    const params: unknown[] = []

    if (search.trim()) {
      conditions.push(`
        (
          title LIKE ?
          OR description LIKE ?
        )
      `)

      const searchValue = `%${search.trim()}%`
      params.push(searchValue, searchValue)
    }

    if (category) {
      conditions.push('category = ?')
      params.push(category)
    }

    if (minPrice !== '') {
      conditions.push('price >= ?')
      params.push(minPrice)
    }

    if (maxPrice !== '') {
      conditions.push('price <= ?')
      params.push(maxPrice)
    }

    const whereClause =
      conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : ''

    const sortMap: Record<SortOption, string> = {
      newest: 'created_at DESC',
      oldest: 'created_at ASC',
      price_asc: 'price ASC',
      price_desc: 'price DESC',
    }

    const orderBy = sortMap[sort] ?? sortMap.newest

    const listings = db
      .prepare(`
        SELECT *
        FROM listings
        ${whereClause}
        ORDER BY ${orderBy}
        LIMIT ? OFFSET ?
      `)
      .all(...params, limit, offset) as Listing[]

    const total = db
      .prepare(`
        SELECT COUNT(*) as count
        FROM listings
        ${whereClause}
      `)
      .get(...params) as { count: number }

    const totalPages = Math.ceil(total.count / limit)

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

  getListingById(id: number): Listing | undefined {
    return db
      .prepare(`
        SELECT *
        FROM listings
        WHERE id = ?
      `)
      .get(id) as Listing | undefined
  }

  createListing(
    title: string,
    description: string,
    condition: Condition,
    price: number,
    category: Category,
    imageUrl: string,
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
      .run(title, description, condition, price, category, imageUrl)

    const listingId = Number(result.lastInsertRowid)

    return this.getListingById(listingId)
  }

  updateListingImage(id: number, imageUrl: string) {
    db.prepare(`
      UPDATE listings
      SET image_url = ?
      WHERE id = ?
    `).run(imageUrl, id)
  }

  deleteListing(id: number): Listing | undefined {
    const listing = this.getListingById(id)

    if (!listing) {
      return undefined
    }

    db.prepare(`
      DELETE FROM listings
      WHERE id = ?
    `).run(id)

    return listing
  }
}