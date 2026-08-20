import "./config/database";
import "./database/tables";

import express from "express";
import cors from "cors";
import path from "path";

import listingRoutes from "./features/listings/listings.routes";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(
  "/public",
  express.static(path.join(process.cwd(), "public"))
);

app.use("/api/listings", listingRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});