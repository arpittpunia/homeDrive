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

export default db;
