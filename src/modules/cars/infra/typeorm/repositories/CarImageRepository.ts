import { getRepository, Repository } from "typeorm";

import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";

import CarImage from "../entities/CarImage";

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<CarImage>;
  constructor() {
    this.repository = getRepository(CarImage);
  }
  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({ car_id, image_name });
    await this.repository.save(carImage);
    return carImage;
  }
  async findByCarId(car_id: string): Promise<CarImage[]> {
    const carImages = await this.repository.find({ car_id });
    return carImages;
  }
}

export { CarImageRepository };
