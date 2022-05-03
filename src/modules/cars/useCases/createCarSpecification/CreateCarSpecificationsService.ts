import { inject, injectable } from "tsyringe";

import ICar from "@modules/cars/entities/ICar";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  specifications_id: string[];
}

@injectable()
class CreateCarSpecificationsService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,

    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async run({ car_id, specifications_id }: IRequest): Promise<ICar> {
    const carExists = await this.carRepository.findById(car_id);
    if (!carExists) {
      throw new AppError("Car does not exists!");
    }
    const specifications = await this.specificationRepository.findByIds(
      specifications_id
    );
    if (specifications_id.length !== specifications.length) {
      throw new AppError("There some specifications that does not exists");
    }

    carExists.specifications = specifications;
    return this.carRepository.create({
      id: carExists.id,
      brand: carExists.brand,
      daily_rate: carExists.daily_rate,
      liscence_plate: carExists.liscence_plate,
      description: carExists.description,
      fine_amount: carExists.fine_amount,
      name: carExists.name,
      specifications: carExists.specifications,
      category_id: carExists.category_id,
    });
  }
}

export { CreateCarSpecificationsService };
