import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCarService } from "./CreateCarService";

class CreateCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const {
      brand,
      name,
      liscence_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
    } = request.body;

    const createCategoryService = container.resolve(CreateCarService);

    const car = await createCategoryService.run({
      brand,
      name,
      liscence_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
    });

    return response.status(201).json(car);
  }
}

export { CreateCarController };
