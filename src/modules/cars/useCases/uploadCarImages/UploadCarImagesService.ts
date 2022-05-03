import { inject, injectable } from "tsyringe";

import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/IStorageProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  car_id: string;
  images_name: string[];
}

@injectable()
class UploadCarImagesService {
  constructor(
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("CarImageRepository")
    private carImageRepository: ICarImageRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) {}

  async run({ car_id, images_name }: IRequest): Promise<void> {
    const car = await this.carRepository.findById(car_id);
    if (!car) {
      throw new AppError("This car does not exists.");
    }
    images_name.map(async (image) => {
      await this.storageProvider.save(image, "cars");
      await this.carImageRepository.create({
        car_id,
        image_name: image,
      });
    });
  }
}

export { UploadCarImagesService };
