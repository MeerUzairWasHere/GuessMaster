import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import { createGame } from "../controllers/game.controller.js";
import { validateGameInput } from "../middleware/validationMiddleware.js";

router.route("/").post(authenticateUser,validateGameInput, createGame);

export default router;
