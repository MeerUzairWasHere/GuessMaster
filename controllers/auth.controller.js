import User from "../models/user.model.js";
import Token from "../models/token.model.js";
import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  UnauthenticatedError,
} from "../errors/customErrors.js";
import { randomBytes } from "crypto";

import {
  hashString,
  createTokenUser,
  attachCookiesToResponse,
} from "../utils/index.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";

export const register = async (req, res) => {
  const { email, name } = req.body;

  // // first registered user is an admin
  // const isFirstAccount = (await User.countDocuments()) === 0;
  // const role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);

  const verificationToken = randomBytes(40).toString("hex");

   await User.create({
    name,
    email,
    password: hashedPassword,
    // role,
    verificationToken,
});


  // send verification token back only while testing in postman!!!
  res.status(StatusCodes.CREATED).json({
    msg: "User registered!",
  });
};



export const login = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await comparePassword(
    req.body.password,
    user.password
  );

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid Credentials");
  }
 
  const tokenUser = createTokenUser(user);

  // create refresh token
  let refreshToken = "";
  // check for existing token
  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    refreshToken = existingToken.refreshToken;
    attachCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  refreshToken = randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, ip, userAgent, user: user._id };

  await Token.create(userToken);

  attachCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};

export const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.userId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};

 