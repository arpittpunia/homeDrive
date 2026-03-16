import express from "express";
import { registerUser, loginUser } from "../services/authService.js";

const router = express.Router();

//registering the user
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    const user = await registerUser(username, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "Username and password are required",
      });
    }

    const result = await loginUser(username, password);

    res.json(result);
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
});

export default router;
