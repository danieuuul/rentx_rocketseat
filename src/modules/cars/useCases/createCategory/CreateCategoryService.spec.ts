import { CategoryRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreateCategoryService } from "./CreateCategoryService";

let createCategoryService: CreateCategoryService;
let categoryRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create a category", () => {
  beforeEach(() => {
    categoryRepositoryInMemory = new CategoryRepositoryInMemory();
    createCategoryService = new CreateCategoryService(
      categoryRepositoryInMemory
    );
  });
  it("should be able to create a new category", async () => {
    const newCategory = {
      name: "Category Test",
      description: "Description test",
    };
    await createCategoryService.run({
      name: newCategory.name,
      description: newCategory.description,
    });
    const categoryCreated = await categoryRepositoryInMemory.findByName(
      newCategory.name
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should not be able to create a new category with a name that already exists", async () => {
    expect(async () => {
      const newCategory = {
        name: "Category Test",
        description: "Description test",
      };
      await createCategoryService.run({
        name: newCategory.name,
        description: newCategory.description,
      });
      await createCategoryService.run({
        name: newCategory.name,
        description: newCategory.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
