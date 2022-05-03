import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import Rental from "../entities/Rental";

class RentalRepository implements IRentalRepository {
  private repository: Repository<Rental>;
  constructor() {
    this.repository = getRepository(Rental);
  }
  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      ...(id && { id }),
      ...(end_date && { end_date }),
      ...(total && { total }),
    });
    await this.repository.save(rental);
    return rental;
  }
  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { car_id, end_date: null } });
  }
  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    return this.repository.findOne({ where: { user_id, end_date: null } });
  }
  async findById(id: string): Promise<Rental> {
    return this.repository.findOne(id);
  }
  async findByUser(user_id: string): Promise<Rental[]> {
    return this.repository.find({ where: { user_id }, relations: ["car"] });
  }
}

export { RentalRepository };
