import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import { createGuess } from "../controllers/guess.controller.js";

router.route("/:gameId").post(authenticateUser, createGuess);


export default router;
