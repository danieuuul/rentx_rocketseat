import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarSpecificationsService } from "./CreateCarSpecificationsService";

class CreateCarSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { specifications_id } = request.body;
    const createCarSpecificationsService = container.resolve(
      CreateCarSpecificationsService
    );

    const car = await createCarSpecificationsService.run({
      car_id: id,
      specifications_id,
    });
    return response.json(car);
  }
}

export { CreateCarSpecificationController };
