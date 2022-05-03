import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import IRental from "@modules/rentals/entities/IRental";

import { IRentalRepository } from "../IRentalRepository";

class RentalRepositoryInMemory implements IRentalRepository {
  private rentals: IRental[];
  constructor() {
    this.rentals = [];
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<IRental> {
    const rental = new IRental();
    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      ...(id && { id }),
      ...(end_date && { end_date }),
      ...(total && { total }),
    });
    this.rentals.push(rental);
    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<IRental> {
    const rental = this.rentals.find(
      (rental) => !rental.end_date && rental.car_id === car_id
    );
    return rental;
  }

  async findOpenRentalByUserId(user_id: string): Promise<IRental> {
    const rental = this.rentals.find(
      (rental) => !rental.end_date && rental.user_id === user_id
    );
    return rental;
  }
  async findById(id: string): Promise<IRental> {
    const rental = this.rentals.find((rental) => rental.id === id);
    return rental;
  }
  async findByUser(user_id: string): Promise<IRental[]> {
    const rentals = this.rentals.filter((rental) => rental.user_id === user_id);
    return rentals;
  }
}

export { RentalRepositoryInMemory };
