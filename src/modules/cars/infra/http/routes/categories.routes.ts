import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "@modules/cars/useCases/createCategory/CreateCategoryController";
import { ImportCategoryController } from "@modules/cars/useCases/importCategories/ImportCategoryController";
import { ListCategoryController } from "@modules/cars/useCases/listCategories/ListCategoryController";
import { ConfirmAdminController } from "@shared/infra/http/middlewares/confirmAdmin/ConfirmAdminController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();
const listCategoryController = new ListCategoryController();
const importCategoryController = new ImportCategoryController();
const confirmAdminController = new ConfirmAdminController();

categoriesRoutes.get("/", listCategoryController.handle);

categoriesRoutes.post(
  "/",
  confirmAdminController.handle,
  createCategoryController.handle
);

categoriesRoutes.post(
  "/import",
  confirmAdminController.handle,
  upload.single("file"),
  importCategoryController.handle
);

export { categoriesRoutes };
