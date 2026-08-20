import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

console.log("DATABASE FILE LOADED");

const dataDirectory = path.join(process.cwd(), "data");

console.log("Data directory:", dataDirectory);

if (!fs.existsSync(dataDirectory)) {
  fs.mkdirSync(dataDirectory, { recursive: true });
}

const dbPath = path.join(dataDirectory, "marketplace.db");

console.log("Database path:", dbPath);

export const db = new Database(dbPath);

db.pragma("journal_mode = WAL");

console.log("SQLite database connected");