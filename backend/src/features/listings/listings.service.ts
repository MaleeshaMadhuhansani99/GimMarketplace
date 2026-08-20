import { db } from "../../config/database";

export class ListingsService {
  getAllListings() {
    const listings = db
      .prepare("SELECT * FROM listings ORDER BY created_at DESC")
      .all();

    return listings;
  }

  getListingById(id: number) {
    const listing = db
      .prepare("SELECT * FROM listings WHERE id = ?")
      .get(id);

    return listing;
  }
}