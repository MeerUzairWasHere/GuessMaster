import { Router } from "express";
const router = Router();

import { authenticateUser } from "../middleware/authentication.js";
import {
  validateRegisterInput,
  validateLoginInput,

} from "../middleware/validationMiddleware.js";
import {
  register,
  login,
  logout,
} from "../controllers/auth.controller.js";

router.post("/register", validateRegisterInput, register);
router.post("/login", validateLoginInput, login);
router.delete("/logout", authenticateUser, logout);

export default router;
