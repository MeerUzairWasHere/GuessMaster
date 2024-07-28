import { Router } from "express";
import { authenticateUser } from "../middleware/authentication.js";
import { getEasyLeaderboard, getHardLeaderboard, getMediumLeaderboard } from "../controllers/leaderboard.controller.js";

const router = Router();
router.get('/easy',authenticateUser, getEasyLeaderboard);
router.get('/medium', authenticateUser, getMediumLeaderboard);
router.get('/hard', authenticateUser, getHardLeaderboard);


export default router;
