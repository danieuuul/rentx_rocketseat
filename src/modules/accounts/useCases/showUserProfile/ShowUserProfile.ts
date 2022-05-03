import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";
import IUser from "@modules/accounts/entities/IUser";
import { UserMap } from "@modules/accounts/mapper/UserMap";
import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";

@injectable()
class ShowUserProfile {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}
  async run(id: string): Promise<IUserResponseDTO> {
    const user = await this.userRepository.findById(id);
    return UserMap.toDTO(user);
  }
}

export { ShowUserProfile };
