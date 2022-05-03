import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import ICategory from "../entities/ICategory";

interface ICategoryRepository {
  findByName(name: string): Promise<ICategory>;
  list(): Promise<ICategory[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<void>;
}

export { ICategoryRepository };
