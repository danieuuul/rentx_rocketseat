import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetPasswordService } from "./ResetPasswordService";

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token } = request.query;
    const { password } = request.body;
    const resetPassowordService = container.resolve(ResetPasswordService);

    resetPassowordService.run({ token: String(token), password });
    return response.send();
  }
}

export { ResetPasswordController };
