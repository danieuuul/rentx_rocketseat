import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateAvatarService } from "./UpdateAvatarService";

class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAvatarService = container.resolve(UpdateAvatarService);

    const user = await updateAvatarService.run({
      userId: request.user.id,
      avatarFile: request.file.filename,
    });

    return response.json({ user });
  }
}

export { UpdateAvatarController };
