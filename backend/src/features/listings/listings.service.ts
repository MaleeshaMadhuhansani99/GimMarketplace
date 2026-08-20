import { db } from "../../config/database";

export class ListingsService {
  getAllListings(page: number, limit: number) {
    const offset = (page - 1) * limit;

    const totalResult = db
      .prepare("SELECT COUNT(*) as total FROM listings")
      .get() as { total: number };

    const total = totalResult.total;

    const listings = db
      .prepare(`
        SELECT *
        FROM listings
        ORDER BY created_at DESC
        LIMIT ? OFFSET ?
      `)
      .all(limit, offset);

    const totalPages = Math.ceil(total / limit);

    return {
      data: listings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    };
  }

  getListingById(id: number) {
    const listing = db
      .prepare("SELECT * FROM listings WHERE id = ?")
      .get(id);

    return listing;
  }
}