import User from "../models/user.model.js";

import { StatusCodes } from "http-status-codes";

export const getEasyLeaderboard = async (req, res) => {
  const users = await User.find({ easyAttempt: { $ne: Infinity }}).sort({ easyAttempt: 1 });
  res.status(StatusCodes.OK).json(
    users.map((user) => ({
      name: user.name,
      easyAttempt: user.easyAttempt,
    }))
  );
};

export const getMediumLeaderboard = async (req, res) => {
  const users = await User.find({ mediumAttempt: { $ne: Infinity }}).sort({ mediumAttempt: 1 });
  res.status(StatusCodes.OK).json(
    users.map((user) => ({
      name: user.name,
      mediumAttempt: user.mediumAttempt,
    }))
  );
};

export const getHardLeaderboard = async (req, res) => {
  // const users = await User.find({}).sort({ hardAttempt: 1 });
  const users = await User.find({ hardAttempt: { $ne: Infinity } }).sort({ hardAttempt: 1 });
  res.status(StatusCodes.OK).json(
    users.map((user) => ({
      name: user.name,
      hardAttempt: user.hardAttempt,
    }))
  );
};
