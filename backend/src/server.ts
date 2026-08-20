import "./config/database";
import "./database/tables";
import express from "express";
import listingRoutes from "./features/listings/listings.routes";

const app = express();

app.use(express.json());

app.use("/api/listings", listingRoutes);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});