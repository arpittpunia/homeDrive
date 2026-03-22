import Database from "better-sqlite3";
const db = new Database("database.sqlite");

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS users(
    id TEXT PRIMARY KEY,
    username TEXT UNIQUE,
    passwordHash TEXT
    )
    `,
).run();

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS files(
    id TEXT PRIMARY KEY,
    userId TEXT NOT NULL,
    originalName TEXT NOT NULL,
    storedName TEXT NOT NULL,
    size INTEGER,
    mimeType TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `,
).run();

export default db;
