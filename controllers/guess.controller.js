import { StatusCodes } from "http-status-codes";
import Game from "../models/game.model.js";
import Guess from "../models/guess.model.js";
import User from "../models/user.model.js";
import { updateUserBestAttempt } from "./user.controller.js";

export const createGuess = async (req, res) => {
  const { guess } = req.body;
  const { gameId } = req.params;

  const game = await Game.findById(gameId);

  if (!game) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: "Game not found" });
  }

  let result;
  if (guess < game.secretNumber) {
    result = "too low";
  } else if (guess > game.secretNumber) {
    result = "too high";
  } else {
    result = "correct";
  }

  // Create a new guess
  const newGuess = new Guess({
    gameId,
    userId: req.user.userId,
    guess,
    result,
  });

  await newGuess.save();

  // Update game attempts if the guess is incorrect
  if (result !== "correct") {
    game.attempts += 1;
    await game.save();
  } else {
    await updateUserBestAttempt(
      req?.user.userId,
      game?.attempts + 1,
      game?.difficulty
    );
  }

  res.status(StatusCodes.OK).json({ result });
};
