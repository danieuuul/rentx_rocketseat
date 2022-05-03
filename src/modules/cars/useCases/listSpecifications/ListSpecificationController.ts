import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSpecificationsService } from "./ListSpecificationsService";

class ListSpecificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listSpecificationsService = container.resolve(
      ListSpecificationsService
    );
    const specification = await listSpecificationsService.run();
    return response.json(specification);
  }
}

export { ListSpecificationController };
