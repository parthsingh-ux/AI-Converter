import express from "express";

import {
  adminResetUserPassword,
  createMultipleUsers,
  getAllUsers,
  signIn,
  signUp,
  updateUser,
  uploadAndCreateUsers,
} from "../controllers/loginController.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { verifyRole } from "../middleware/roleMiddleware.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", verifyUser(), verifyRole("admin"), signUp);
router.get("/all-users", verifyUser(), verifyRole("admin"), getAllUsers);
router.put("/update-user/:id", verifyUser(), verifyRole("admin"), updateUser);
router.post("/signin", signIn);

router.post(
  "/upload-users-file",
  verifyUser(),
  verifyRole("admin"),
  upload.single("file"),
  uploadAndCreateUsers
);

router.post(
  "/create-multiple-users",
  verifyUser(),
  verifyRole("admin"),
  createMultipleUsers
);

router.put(
  "/admin-reset-password/:id",
  verifyUser(),
  verifyRole("admin"),
  adminResetUserPassword
);

export default router;
