import { injectable, inject } from "tsyringe";

import IRental from "@modules/rentals/entities/IRental";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

@injectable()
class ListRentalsByUserService {
  constructor(
    @inject("RentalRepository")
    private rentalRepository: IRentalRepository
  ) {}
  async run(user_id: string): Promise<IRental[]> {
    const rentalsByUser = await this.rentalRepository.findByUser(user_id);
    return rentalsByUser;
  }
}

export { ListRentalsByUserService };
