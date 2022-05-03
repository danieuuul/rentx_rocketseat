import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListRentalsByUserService } from "./ListRentalsByUserService";

class ListRentalsByUserController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request.user;

    const listRentalByUserService = container.resolve(ListRentalsByUserService);

    const rentals = await listRentalByUserService.run(user_id);

    return response.json(rentals);
  }
}

export { ListRentalsByUserController };
