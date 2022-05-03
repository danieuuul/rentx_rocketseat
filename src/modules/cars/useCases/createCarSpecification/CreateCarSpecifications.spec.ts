import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { SpecificationRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreateCarSpecificationsService } from "./CreateCarSpecificationsService";

let carRepositoryInMemory: CarRepositoryInMemory;
let specificationRepositoryInMemory: SpecificationRepositoryInMemory;
let createCarSpecificationsService: CreateCarSpecificationsService;

describe("Create car specification", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    specificationRepositoryInMemory = new SpecificationRepositoryInMemory();
    createCarSpecificationsService = new CreateCarSpecificationsService(
      carRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });
  it("should be able to add new specifications to the car", async () => {
    const newCar = await carRepositoryInMemory.create({
      brand: "Brand Test",
      name: "Test Car",
      liscence_plate: "ABC-1234",
      fine_amount: 100,
      category_id: "category_test",
      description: "Description Test",
      daily_rate: 10,
    });
    const spec1 = await specificationRepositoryInMemory.create({
      name: "Specification Test 1",
      description: "Description test",
    });
    const spec2 = await specificationRepositoryInMemory.create({
      name: "Specification Test 1",
      description: "Description test",
    });
    const carWithSpecifications = await createCarSpecificationsService.run({
      car_id: newCar.id,
      specifications_id: [spec1.id, spec2.id],
    });
    expect(carWithSpecifications).toHaveProperty("id");
    expect(carWithSpecifications.specifications.length).toBe(2);
  });
  it("should not be able to add new specifications to a nonexistent car", () => {
    expect(async () => {
      const car_id = "123456";
      const specifications_id = ["1111", "2222"];
      await createCarSpecificationsService.run({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to add nonexistents specifications to the car", async () => {
    expect(async () => {
      const newCar = await carRepositoryInMemory.create({
        brand: "Brand Test",
        name: "Test Car",
        liscence_plate: "ABC-1234",
        fine_amount: 100,
        category_id: "category_test",
        description: "Description Test",
        daily_rate: 10,
      });
      const specifications_id = ["111", "222"];
      await createCarSpecificationsService.run({
        car_id: newCar.id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
