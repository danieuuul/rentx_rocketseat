import { inject, injectable } from "tsyringe";

import ICar from "@modules/cars/entities/ICar";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  liscence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async run({
    brand,
    name,
    liscence_plate,
    fine_amount,
    category_id,
    description,
    daily_rate,
  }: IRequest): Promise<ICar> {
    const carAlreadyExists = await this.carRepository.findByLiscencePlate(
      liscence_plate
    );

    if (carAlreadyExists) {
      throw new AppError("Car already exists.");
    }

    const newCar = await this.carRepository.create({
      brand,
      name,
      liscence_plate,
      fine_amount,
      category_id,
      description,
      daily_rate,
    });
    return newCar;
  }
}

export { CreateCarService };
