import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import ICar from "@modules/cars/entities/ICar";

import { ICarRepository } from "../ICarRepository";

class CarRepositoryInMemory implements ICarRepository {
  cars: ICar[] = [];
  async create({
    brand,
    name,
    liscence_plate,
    fine_amount,
    category_id,
    description,
    daily_rate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<ICar> {
    const car = new ICar();
    Object.assign(car, {
      brand,
      name,
      liscence_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
      ...(specifications && { specifications }),
      ...(id && { id }),
    });
    this.cars.push(car);
    return car;
  }
  async findByLiscencePlate(liscence_plate: string): Promise<ICar> {
    const car = this.cars.find((c) => c.liscence_plate === liscence_plate);
    return car;
  }
  async findAllAvailable(
    brand: string,
    category_id: string,
    name: string
  ): Promise<ICar[]> {
    return this.cars
      .filter((car) => car.available === true)
      .filter((car) => !brand || car.brand === brand)
      .filter((car) => !category_id || car.category_id === category_id)
      .filter((car) => !name || car.name === name);
  }
  async findById(id: string): Promise<ICar> {
    return this.cars.find((car) => car.id === id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex((car) => car.id === id);
    this.cars[findIndex].available = available;
  }
}

export { CarRepositoryInMemory };
