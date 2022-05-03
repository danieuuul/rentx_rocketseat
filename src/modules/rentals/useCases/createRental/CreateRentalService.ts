import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import IRental from "@modules/rentals/entities/IRental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: string;
}

@injectable()
class CreateRentalService {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async run({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<IRental> {
    const carWithRentalInProgress =
      await this.rentalRepository.findOpenRentalByCarId(car_id);
    if (carWithRentalInProgress) {
      throw new AppError("This car is unavailable");
    }

    const userWithRentalInProgress =
      await this.rentalRepository.findOpenRentalByUserId(user_id);
    if (userWithRentalInProgress) {
      throw new AppError("There is a rental in progress for this user.");
    }
    const expected_return_date_InDate =
      this.dateProvider.parse_ISO_to_Date(expected_return_date);
    if (
      this.dateProvider.differenceInHours(
        expected_return_date_InDate,
        Date.now()
      ) < 24
    ) {
      throw new AppError("Less than 24 hours");
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date: expected_return_date_InDate,
    });

    await this.carRepository.updateAvailable(car_id, false);

    return rental;
  }
}
export { CreateRentalService };
