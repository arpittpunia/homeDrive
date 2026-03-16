import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import db from "../db/db.js";

const JWT_SECRET = process.env.JWT_SECRET;
const SALT_ROUNDS = 10;


export async function registerUser(username, password) {
  const existingUser = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);

  if (existingUser) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const userId = randomUUID();

  db.prepare(
    `
        INSERT INTO users(id, username, passwordHash)
        VALUES(?, ?, ?)    
    `,
  ).run(userId, username, passwordHash);

  await fs.mkdir(`storage/${userId}/files`, { recursive: true });
  await fs.mkdir(`storage/${userId}/thumbnails`, { recursive: true });

  return {
    id: userId,
    username,
  };
}

export async function loginUser(username, password) {
  const user = db
    .prepare("SELECT * FROM users WHERE username = ?")
    .get(username);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return { token };
}
