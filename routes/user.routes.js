import { Router } from "express";
const router = Router();
import { authenticateUser } from "../middleware/authentication.js";
import {
  showCurrentUser,
  updateUser,
  updateUserPassword,
} from "../controllers/user.controller.js";
import {
  validateUpdateUserInput,
  validateUpdatePasswordInput,
} from "../middleware/validationMiddleware.js";

router.route("/current-user").get(authenticateUser, showCurrentUser);
router
  .route("/updateUser")
  .patch(authenticateUser, validateUpdateUserInput, updateUser);
router
  .route("/updateUserPassword")
  .patch(validateUpdatePasswordInput, authenticateUser, updateUserPassword);

export default router;
