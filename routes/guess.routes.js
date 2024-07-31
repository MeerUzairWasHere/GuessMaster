import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import { createGuess } from "../controllers/guess.controller.js";
import { validateGuessInput } from "../middleware/validationMiddleware.js";

router
  .route("/:gameId")
  .post(authenticateUser, validateGuessInput, createGuess);

export default router;
