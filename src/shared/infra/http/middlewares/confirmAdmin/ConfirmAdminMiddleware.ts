import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import AppError from "@shared/errors/AppError";

@injectable()
class ConfirmAdminMiddleware {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async run(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user.is_admin) {
      throw new AppError("User isn't admin!");
    }
  }
}

export { ConfirmAdminMiddleware };
