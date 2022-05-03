import IUser from "@modules/accounts/entities/IUser";

import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { IUserRepository } from "../IUserRepository";

class UserRepositoryInMemory implements IUserRepository {
  users: IUser[] = [];
  async create({
    driver_license,
    email,
    name,
    password,
  }: ICreateUserDTO): Promise<void> {
    const newUser = new IUser();
    Object.assign(newUser, { driver_license, email, name, password });
    this.users.push(newUser);
  }
  async update(user: IUser): Promise<IUser> {
    const updatedUser = this.users.find((u) => u.id === user.id);
    Object.assign(updatedUser, user);
    return updatedUser;
  }
  async findByEmail(email: string): Promise<IUser> {
    return this.users.find((user) => user.email === email);
  }
  async findById(id: string): Promise<IUser> {
    return this.users.find((user) => user.id === id);
  }
}

export { UserRepositoryInMemory };
