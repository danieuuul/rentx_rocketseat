import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import IUser from "../entities/IUser";

interface IUserRepository {
  create(data: ICreateUserDTO): Promise<void>;
  update(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser>;
  findById(id: string): Promise<IUser>;
}

export { IUserRepository };
