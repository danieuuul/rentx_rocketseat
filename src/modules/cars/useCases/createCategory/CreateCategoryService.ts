import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import { ICategoryRepository } from "@modules/cars/repositories/ICategoryRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoriesRepository: ICategoryRepository
  ) {}

  async run({ name, description }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name
    );

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists.");
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryService };
