import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";

import { ListAvailableCarsService } from "./ListAvailableCarsService";

let listCarsService: ListAvailableCarsService;
let carRepositoryInMemory: CarRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carRepositoryInMemory = new CarRepositoryInMemory();
    listCarsService = new ListAvailableCarsService(carRepositoryInMemory);
  });
  it("should be able to list all available cars", async () => {
    const car1 = await carRepositoryInMemory.create({
      brand: "Brand1",
      name: "Name1",
      liscence_plate: "111",
      fine_amount: 100,
      category_id: null,
      description: "Description Car1",
      daily_rate: 10,
    });
    const car2 = await carRepositoryInMemory.create({
      brand: "Brand1",
      name: "Name2",
      liscence_plate: "222",
      fine_amount: 100,
      category_id: null,
      description: "Description Car2",
      daily_rate: 10,
    });
    const car3 = await carRepositoryInMemory.create({
      brand: "Brand3",
      name: "Name3",
      liscence_plate: "333",
      fine_amount: 100,
      category_id: null,
      description: "Description Car3",
      daily_rate: 10,
    });
    const cars = await listCarsService.run({});
    expect(cars).toEqual(expect.arrayContaining([car1, car2, car3]));
  });
  it("should be able to list all available cars by brand, category_id and/or name", async () => {
    const car1 = await carRepositoryInMemory.create({
      brand: "Brand1",
      name: "Name1",
      liscence_plate: "111",
      fine_amount: 100,
      category_id: "1",
      description: "Description Car1",
      daily_rate: 10,
    });
    const car2 = await carRepositoryInMemory.create({
      brand: "Brand1",
      name: "Name2",
      liscence_plate: "222",
      fine_amount: 100,
      category_id: "1",
      description: "Description Car2",
      daily_rate: 10,
    });
    const car3 = await carRepositoryInMemory.create({
      brand: "Brand2",
      name: "Name3",
      liscence_plate: "333",
      fine_amount: 100,
      category_id: "3",
      description: "Description Car3",
      daily_rate: 10,
    });
    const car4 = await carRepositoryInMemory.create({
      brand: "Brand2",
      name: "Name3",
      liscence_plate: "444",
      fine_amount: 100,
      category_id: "4",
      description: "Description Car4",
      daily_rate: 10,
    });
    const car5 = await carRepositoryInMemory.create({
      brand: "Brand1",
      name: "Name3",
      liscence_plate: "555",
      fine_amount: 100,
      category_id: "5",
      description: "Description Car5",
      daily_rate: 10,
    });
    const car6 = await carRepositoryInMemory.create({
      brand: "Brand1",
      name: "Name3",
      liscence_plate: "666",
      fine_amount: 100,
      category_id: "5",
      description: "Description Car6",
      daily_rate: 10,
    });
    const list1 = await listCarsService.run({ brand: "Brand1" });
    expect(list1).toEqual(expect.arrayContaining([car1, car2, car5, car6]));

    const list2 = await listCarsService.run({ category_id: "1" });
    expect(list2).toEqual(expect.arrayContaining([car1, car2]));

    const list3 = await listCarsService.run({ name: "Name3" });
    expect(list3).toEqual(expect.arrayContaining([car3, car4, car5, car6]));

    const list4 = await listCarsService.run({
      brand: "Brand1",
      category_id: "5",
    });
    expect(list4).toEqual(expect.arrayContaining([car5, car6]));

    const list5 = await listCarsService.run({
      brand: "Brand1",
      name: "Name2",
    });
    expect(list5).toEqual(expect.arrayContaining([car2]));

    const list6 = await listCarsService.run({
      name: "Name3",
      category_id: "1",
    });
    expect(list6).toEqual(expect.arrayContaining([]));

    const list7 = await listCarsService.run({
      brand: "Brand1",
      name: "Name3",
      category_id: "5",
    });
    expect(list7).toEqual(expect.arrayContaining([car5, car6]));
  });
});
