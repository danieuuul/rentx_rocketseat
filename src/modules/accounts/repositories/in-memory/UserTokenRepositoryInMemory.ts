import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import UserToken from "@modules/accounts/infra/typeorm/entities/UserToken";

import { IUserTokenRepository } from "../IUserTokenRepository";

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  userTokens: UserToken[] = [];
  async create({
    expires_date,
    refresh_token,
    user_id,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();
    Object.assign(userToken, {
      expires_date,
      refresh_token,
      user_id,
    });
    this.userTokens.push(userToken);
    return userToken;
  }
  async deleteById(id: string): Promise<void> {
    const userToken = this.userTokens.find((userToken) => userToken.id === id);
    this.userTokens.splice(this.userTokens.indexOf(userToken));
  }

  async findByRefreshToken(refresh_token: string): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (userToken) => userToken.refresh_token === refresh_token
    );
    return userToken;
  }

  async findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken> {
    const userToken = this.userTokens.find(
      (userToken) =>
        userToken.refresh_token === refresh_token &&
        userToken.user_id === user_id
    );
    return userToken;
  }
}

export { UserTokenRepositoryInMemory };
