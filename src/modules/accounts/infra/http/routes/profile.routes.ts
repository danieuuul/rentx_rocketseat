import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { ShowUserProfileController } from "@modules/accounts/useCases/showUserProfile/ShowUserProfileController";

import { UpdateAvatarController } from "../../../useCases/updateAvatar/UpdateAvatarController";

const profileRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const updateAvatarController = new UpdateAvatarController();
const showUserProfileController = new ShowUserProfileController();

profileRoutes.patch(
  "/avatar",
  uploadAvatar.single("avatar"),
  updateAvatarController.handle
);

profileRoutes.get("/", showUserProfileController.handle);

export { profileRoutes };
