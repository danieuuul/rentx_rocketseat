import { getRepository, Repository } from "typeorm";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import IUser from "@modules/accounts/entities/IUser";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

import User from "../entities/User";

class UserRepository implements IUserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create(data: ICreateUserDTO): Promise<void> {
    const user = this.repository.create(data);

    await this.repository.save(user);
  }

  async update(user: IUser): Promise<IUser> {
    return this.repository.save(user);
  }

  async findByEmail(email: string): Promise<IUser> {
    const user = (await this.repository.findOne({ email })) as IUser;
    return user;
  }

  async findById(id: string): Promise<IUser> {
    const user = (await this.repository.findOne(id)) as IUser;
    return user;
  }
}

export { UserRepository };
