import { StatusCodes } from "http-status-codes";
import Game from "../models/game.model.js";

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

  if (game?.userId?.toString() !== req.user.userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "You're not Authorized, Login with same id as gameId" });
  }

  let result;
  if (guess < game.secretNumber) {
    result = `${guess} is too low!`;
  } else if (guess > game.secretNumber) {
    result = `${guess} is too high!`;
  } else {
    result = `Yay! ${guess} is correct! You Won!`;
  }
  // Update game attempts if the guess is incorrect
  game.attempts += 1;

  if (result !== `Yay! ${guess} is correct! You Won!`) {
    await game.save();
  } else {
    await updateUserBestAttempt(
      req?.user.userId,
      game?.attempts,
      game?.difficulty
    );
    await game.save();
    await Game.findOneAndDelete({
      userId: req.user.userId,
      _id: gameId,
    });
  }

  res.status(StatusCodes.OK).json({ result });
};
