import express from "express";
import { listUserFiles } from "../services/fileService.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateToken, async (req, res)=>{
    try{
        const userId = req.user.id;
        const files = await listUserFiles(userId);
        res.json({ files });
    } catch (err){
        res.status(500).json({
            error: err.message
        });
    }
});

export default router;