import { StatusCodes } from "http-status-codes";
import Game from "../models/game.model.js";

export const createGame = async (req, res) => {
  const { difficulty } = req.body;

  let secretNumber;

  if (difficulty === "easy") {
    secretNumber = Math.floor(Math.random() * 100);
  } else if (difficulty === "medium") {
    secretNumber = Math.floor(Math.random() * 1000);
  } else if (difficulty === "hard") {
    secretNumber = Math.floor(Math.random() * 10000);
  }

  const game = await Game.create({
    userId: req.user.userId,
    difficulty,
    secretNumber,
  });

  res.status(StatusCodes.OK).json({
    _id: game._id,
    userId: game.userId,
    difficulty: game.difficulty,
    attempts: game.attempts,
    createdAt: game.createdAt,
  });

};

export const getAllGames = async (req, res) => {
  const games = await Game.find({ userId: req.user.userId }).select(
    "-secretNumber"
  );
  res.status(StatusCodes.OK).json({ games });
};

export const deleteGame = async (req, res) => {
  const { id } = req.params;
  const game = await Game.findOneAndDelete({
    userId: req.user.userId,
    _id: id,
  });
  if (!game) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: `no game found with id ${id} ` });
  }

  res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
};
