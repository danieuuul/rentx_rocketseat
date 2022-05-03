import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";
import ICarImage from "../entities/ICarImage";

interface ICarImageRepository {
  create(data: ICreateCarImageDTO): Promise<ICarImage>;
  findByCarId(car_id: string): Promise<ICarImage[]>;
}

export { ICarImageRepository };
