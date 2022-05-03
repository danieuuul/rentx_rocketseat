import { Router } from "express";

import { passwordRoutes } from "@modules/accounts/infra/http/routes/password.routes";
import { profileRoutes } from "@modules/accounts/infra/http/routes/profile.routes";
import { sessionsRoutes } from "@modules/accounts/infra/http/routes/sessions.routes";
import { usersRoutes } from "@modules/accounts/infra/http/routes/users.routes";
import { carsRoutes } from "@modules/cars/infra/http/routes/cars.routes";
import { categoriesRoutes } from "@modules/cars/infra/http/routes/categories.routes";
import { specificationsRoutes } from "@modules/cars/infra/http/routes/specifications.routes";
import { rentalsRoutes } from "@modules/rentals/infra/http/routes/rentals.routes";

import { confirmAuthentication } from "../middlewares/confirmAuthentication";

const router = Router();

router.use("/users", usersRoutes);
router.use("/password", passwordRoutes);
router.use("/session", sessionsRoutes);

router.use("/categories", confirmAuthentication, categoriesRoutes);
router.use("/cars", confirmAuthentication, carsRoutes);
router.use("/specifications", confirmAuthentication, specificationsRoutes);
router.use("/profile", confirmAuthentication, profileRoutes);
router.use("/rentals", confirmAuthentication, rentalsRoutes);

export { router };
