import { inject, injectable } from "tsyringe";

import ICar from "@modules/cars/entities/ICar";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";

interface IRequest {
  category_id?: string;
  brand?: string;
  name?: string;
}

@injectable()
class ListAvailableCarsService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository
  ) {}

  async run({ category_id, brand, name }: IRequest): Promise<ICar[]> {
    const cars = await this.carRepository.findAllAvailable(
      brand,
      category_id,
      name
    );
    return cars;
  }
}

export { ListAvailableCarsService };
