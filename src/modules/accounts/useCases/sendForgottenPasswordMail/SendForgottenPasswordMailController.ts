import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgottenPasswordMailService } from "./SendForgottenPasswordMailService";

class SendForgottenPasswordMailController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const sendForgottenPasswordMailService = container.resolve(
      SendForgottenPasswordMailService
    );

    await sendForgottenPasswordMailService.run(email);

    return response.send();
  }
}

export { SendForgottenPasswordMailController };
