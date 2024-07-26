import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import {
  createGame,
  deleteGame,
  getAllGames,
} from "../controllers/game.controller.js";
import { validateGameInput } from "../middleware/validationMiddleware.js";

router
  .route("/")
  .post(authenticateUser, validateGameInput, createGame)
  .get(authenticateUser, getAllGames);

router.route("/:id").delete(authenticateUser, deleteGame);

export default router;
