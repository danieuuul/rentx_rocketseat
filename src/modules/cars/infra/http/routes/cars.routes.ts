import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationsController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import { ConfirmAdminController } from "@shared/infra/http/middlewares/confirmAdmin/ConfirmAdminController";

const carsRoutes = Router();

const uploadCarImages = multer(uploadConfig);

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const confirmAdminController = new ConfirmAdminController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.get("/available", listAvailableCarsController.handle);
carsRoutes.post("/", confirmAdminController.handle, createCarController.handle);
carsRoutes.post(
  "/:id/specifications/",
  confirmAdminController.handle,
  createCarSpecificationController.handle
);

carsRoutes.post(
  "/:id/images",
  confirmAdminController.handle,
  uploadCarImages.array("images"),
  uploadCarImagesController.handle
);

export { carsRoutes };
