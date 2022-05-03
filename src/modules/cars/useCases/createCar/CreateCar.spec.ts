import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import AppError from "@shared/errors/AppError";

import { CreateCarService } from "./CreateCarService";

let createCarService: CreateCarService;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    createCarService = new CreateCarService(carRepositoryInMemory);
  });
  it("should be able to create a new car", async () => {
    const newCar = await createCarService.run({
      brand: "Brand Test",
      name: "Test Car",
      liscence_plate: "ABC-1234",
      fine_amount: 100,
      category_id: "category_test",
      description: "Description Test",
      daily_rate: 10,
    });
    expect(newCar).toHaveProperty("id");
  });
  it("should not be able to create a new car with a liscence plate that already exists", async () => {
    expect(async () => {
      const newCar = await createCarService.run({
        brand: "Brand Test",
        name: "Test Car",
        liscence_plate: "ABC-1234",
        fine_amount: 100,
        category_id: "category_test",
        description: "Description Test",
        daily_rate: 10,
      });
      await createCarService.run({
        brand: "Brand Test 2",
        name: "Test Car 2",
        liscence_plate: newCar.liscence_plate,
        fine_amount: 100,
        category_id: "category_test_2",
        description: "Description Test 2",
        daily_rate: 10,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to create a car with available true by default", async () => {
    expect(async () => {
      const newCar = await createCarService.run({
        brand: "Brand Test",
        name: "Test Car",
        liscence_plate: "ABC-1234",
        fine_amount: 100,
        category_id: "category_test",
        description: "Description Test",
        daily_rate: 10,
      });
      expect(newCar.available).toBe(true);
    });
  });
});
