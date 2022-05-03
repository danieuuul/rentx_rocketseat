import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

import Car from "../entities/Car";

class CarRepository implements ICarRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

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
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      name,
      liscence_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
      specifications,
      id,
    });
    await this.repository.save(car);
    return car;
  }
  async findByLiscencePlate(liscence_plate: string): Promise<Car> {
    const car = await this.repository.findOne({ liscence_plate });
    return car;
  }

  async findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]> {
    const carsQuery = await this.repository
      .createQueryBuilder("c")
      .where("c.available = :available", { available: true });
    if (brand) {
      carsQuery.andWhere("c.brand = :brand", { brand });
    }
    if (category_id) {
      carsQuery.andWhere("c.category_id = :category_id", { category_id });
    }
    if (name) {
      carsQuery.andWhere("c.name = :name", { name });
    }
    const cars = await carsQuery.getMany();
    return cars;
  }
  async findById(id: string): Promise<Car> {
    return this.repository.findOne(id);
  }
  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.repository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where("id = :id")
      .setParameters({ id })
      .execute();
  }
}

export { CarRepository };
