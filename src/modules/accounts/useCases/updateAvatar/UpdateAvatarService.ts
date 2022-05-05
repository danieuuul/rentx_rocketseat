import { inject, injectable } from "tsyringe";

import User from "@modules/accounts/infra/typeorm/entities/User";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import IStorageProvider from "@shared/container/providers/StorageProvider/IStorageProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateAvatarService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async run({ userId, avatarFile }: IRequest): Promise<User> {
    const user = await this.userRepository.findById(userId);
    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatarFile, "avatar");

    if (!user) {
      throw new AppError("Only authenticated users can change avatar.", 401);
    }

    user.avatar = avatarFile;
    await this.userRepository.update(user);
    return user;
  }
}

export { UpdateAvatarService };
