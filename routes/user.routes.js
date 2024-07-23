import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import { showCurrentUser } from "../controllers/user.controller.js";

router.route("/current-user").get(authenticateUser, showCurrentUser);

export default router;
