import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.js"
import { authenticateToken } from "./middleware/authMiddleware.js";
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.get("/protected", authenticateToken, (req, res)=>{
    res.json({
        message: "Testing Protected route",
        user: req.user
    });
});

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server running on PORT ${PORT}`);
})