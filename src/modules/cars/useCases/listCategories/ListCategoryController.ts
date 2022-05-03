import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryService } from "./ListCategoryService";

class ListCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoryService);
    const categories = await listCategoriesService.run();
    return response.json(categories);
  }
}

export { ListCategoryController };
