import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import { generateKey } from "../controllers/apiKey.controller.js";

router
  .route("/generate")
  .post(authenticateUser, generateKey);

export default router;
