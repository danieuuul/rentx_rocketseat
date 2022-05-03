import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import IUserToken from "../entities/IUserToken";

interface IUserTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<IUserToken>;
  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<IUserToken>;
  deleteById(id: string): Promise<void>;
  findByRefreshToken(refresh_token: string): Promise<IUserToken>;
}

export { IUserTokenRepository };
