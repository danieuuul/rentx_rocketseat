import { ICreateCategoryDTO } from "@modules/cars/dtos/ICreateCategoryDTO";
import ICategory from "@modules/cars/entities/ICategory";

import { ICategoryRepository } from "../ICategoryRepository";

class CategoryRepositoryInMemory implements ICategoryRepository {
  categories: ICategory[] = [];

  async findByName(name: string): Promise<ICategory> {
    const category = this.categories.find((c) => c.name === name);
    return category;
  }
  async list(): Promise<ICategory[]> {
    return this.categories;
  }
  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = new ICategory();
    Object.assign(category, { name, description });
    this.categories.push(category);
  }
}

export { CategoryRepositoryInMemory };
