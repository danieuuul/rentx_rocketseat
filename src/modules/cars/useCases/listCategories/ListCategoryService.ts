import { inject, injectable } from "tsyringe";

import ICategory from "@modules/cars/entities/ICategory";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";

@injectable()
class ListCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async run(): Promise<ICategory[]> {
    const categories = await this.categoriesRepository.list();
    return categories;
  }
}

export { ListCategoryService };
