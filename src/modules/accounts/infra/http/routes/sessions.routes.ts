import { Router } from "express";

import { RefreshTokenController } from "@modules/accounts/useCases/refreshToken/RefreshTokenController";

import { CreateSessionController } from "../../../useCases/createSession/CreateSessionController";

const sessionsRoutes = Router();

const createSessionController = new CreateSessionController();
const refreshTokenController = new RefreshTokenController();

sessionsRoutes.post("/create-session", createSessionController.handle);
sessionsRoutes.post("/refresh-token", refreshTokenController.handle);

export { sessionsRoutes };
