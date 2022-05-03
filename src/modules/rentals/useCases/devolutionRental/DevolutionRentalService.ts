import { inject, injectable } from "tsyringe";

import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import IRental from "@modules/rentals/entities/IRental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalService {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository,
    @inject("CarRepository")
    private carRepository: ICarRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async run({ id, user_id }: IRequest): Promise<IRental> {
    const rental = await this.rentalRepository.findById(id);
    const minimumDaily = 1;

    const car = await this.carRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError("Rental does not exist.");
    }

    if (rental.end_date !== null) {
      throw new AppError("Rental already finished.");
    }

    const dateNow = Date.now();

    let daily = this.dateProvider.differenceInDays(dateNow, rental.start_date);

    if (daily < minimumDaily) {
      daily = minimumDaily;
    }

    const delay = this.dateProvider.differenceInDays(
      dateNow,
      rental.expected_return_date
    );

    let fine_ammount = 0;
    if (delay > 0) {
      fine_ammount = delay * car.fine_amount;
    }

    const total_daily = daily * car.daily_rate + fine_ammount;
    rental.end_date = new Date(dateNow);
    rental.total = total_daily;

    await this.rentalRepository.create(rental);
    await this.carRepository.updateAvailable(car.id, true);

    return rental;
  }
}

export { DevolutionRentalService };
