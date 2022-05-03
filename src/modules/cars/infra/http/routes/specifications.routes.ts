import { Router } from "express";

import { CreateSpecificationController } from "@modules/cars/useCases/createSpecification/CreateSpecificationController";
import { ListSpecificationController } from "@modules/cars/useCases/listSpecifications/ListSpecificationController";
import { ConfirmAdminController } from "@shared/infra/http/middlewares/confirmAdmin/ConfirmAdminController";

const specificationsRoutes = Router();

const listEpecificationController = new ListSpecificationController();
const createSpecificationController = new CreateSpecificationController();
const confirmAdminController = new ConfirmAdminController();

specificationsRoutes.get("/", listEpecificationController.handle);

specificationsRoutes.post(
  "/",
  confirmAdminController.handle,
  createSpecificationController.handle
);

export { specificationsRoutes };
