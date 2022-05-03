import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";

import { ConfirmAdminMiddleware } from "./ConfirmAdminMiddleware";

class ConfirmAdminController {
  async handle(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> {
    const { id } = request.user;

    const confirmAdmin = container.resolve(ConfirmAdminMiddleware);

    await confirmAdmin.run(id);

    return next();
  }
}

export { ConfirmAdminController };
