import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSessionService } from "./CreateSessionService";

class CreateSessionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, email } = request.body;

    const createSessionService = container.resolve(CreateSessionService);

    const session = await createSessionService.run({
      password,
      email,
    });

    return response.json(session);
  }
}

export { CreateSessionController };
