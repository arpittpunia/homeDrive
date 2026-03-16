import dotenv from "dotenv";
dotenv.config();
console.log("JWT_SECRET:", process.env.JWT_SECRET);
import express from "express";
import authRoutes from "./routes/auth.js"

const app = express();

app.use(express.json());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", ()=>{
    console.log(`Server running on PORT ${PORT}`);
})