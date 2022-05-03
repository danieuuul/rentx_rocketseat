import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import auth from "@config/auth";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import IDateProvider from "@shared/container/providers/DateProvider/IDateProvider";
import AppError from "@shared/errors/AppError";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenService {
  constructor(
    @inject("UserTokenRepository")
    private userTokenRepository: IUserTokenRepository,
    @inject("DateProvider")
    private dateProvider: IDateProvider
  ) {}
  async run(refresh_token: string): Promise<ITokenResponse> {
    const {
      secret_refresh_token,
      expires_in_refresh_token,
      expires_in_refresh_token_days,
      secret_token,
      expires_in_token,
    } = auth;

    const { sub: user_id, email } = verify(
      refresh_token,
      secret_refresh_token
    ) as IPayload;

    const userToken = await this.userTokenRepository.findByUserAndRefreshToken(
      user_id,
      refresh_token
    );
    if (!userToken) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.userTokenRepository.deleteById(userToken.id);

    const new_refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token,
    });

    const new_refresh_token_expires_date = this.dateProvider.addDaysFromNow(
      expires_in_refresh_token_days
    );

    await this.userTokenRepository.create({
      expires_date: new_refresh_token_expires_date,
      refresh_token: new_refresh_token,
      user_id,
    });

    const token = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token,
    });

    return {
      refresh_token: new_refresh_token,
      token,
    };
  }
}

export { RefreshTokenService };
