import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import ICar from "../entities/ICar";

interface ICarRepository {
  create(data: ICreateCarDTO): Promise<ICar>;
  findByLiscencePlate(liscence_plate: string): Promise<ICar>;
  findAllAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<ICar[]>;
  findById(id: string): Promise<ICar>;
  updateAvailable(id: string, available: boolean): Promise<void>;
}

export { ICarRepository };
