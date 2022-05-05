import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { IUserRepository } from "@modules/accounts/repositories/IUserRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) { }

  async run({ token, password }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token is invalid");
    }
    if (!this.dateProvider.isBefore(Date.now(), userToken.expires_date)) {
      throw new AppError("Token expired");
    }

    const user = await this.userRepository.findById(userToken.user_id);
    if (!user) {
      throw new AppError("User does not exists anymore.");
    }
    user.password = await hash(password, 8);
    await this.userRepository.create(user);

    await this.userTokenRepository.deleteById(userToken.id);
  }
}

export { ResetPasswordService };
