import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import IRental from "../entities/IRental";

interface IRentalRepository {
  create(data: ICreateRentalDTO): Promise<IRental>;
  findOpenRentalByCarId(car_id: string): Promise<IRental>;
  findOpenRentalByUserId(user_id: string): Promise<IRental>;
  findById(id: string): Promise<IRental>;
  findByUser(user_id: string): Promise<IRental[]>;
}

export { IRentalRepository };
