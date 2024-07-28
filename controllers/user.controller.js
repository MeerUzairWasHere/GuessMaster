import User from "../models/user.model.js";
import { StatusCodes } from "http-status-codes";


export const showCurrentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const updateUserBestAttempt = async (userId, attempts, difficulty) => {
  const user = await User.findById(userId);
  
  switch(difficulty) {
    case 'easy':
      if (attempts < user.easyAttempt) {
        user.easyAttempt = attempts;
      }
      break;
    case 'medium':
      if (attempts < user.mediumAttempt) {
        user.mediumAttempt = attempts;
      }
      break;
    case 'hard':
      if (attempts < user.hardAttempt) {
        user.hardAttempt = attempts;
      }
      break;
    default:
      throw new Error('Invalid difficulty level');
  }
  
  await user.save();
};
