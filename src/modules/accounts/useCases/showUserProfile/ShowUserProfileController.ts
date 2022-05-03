import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowUserProfile } from "./ShowUserProfile";

class ShowUserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const showUserProfile = container.resolve(ShowUserProfile);
    const user = await showUserProfile.run(id);
    return response.json(user);
  }
}

export { ShowUserProfileController };
