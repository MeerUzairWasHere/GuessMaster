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

  res.status(StatusCodes.OK).json({ game });
};

export const getAll = async (req, res) => {
    const games = await Game.
  res.status(StatusCodes.OK).json({ msg: "getAll" });
};

export const getSingle = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: "getSingle" });
};

export const update = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: "Updated Successfully" });
};

export const delete_ = async (req, res) => {
  const { id } = req.params;
  res.status(StatusCodes.OK).json({ msg: "Deleted Successfully" });
};
