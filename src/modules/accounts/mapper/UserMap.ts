import { instanceToInstance } from "class-transformer";

import { IUserResponseDTO } from "@modules/accounts/dtos/IUserResponseDTO";

import IUser from "../entities/IUser";

class UserMap {
  static toDTO({
    email,
    name,
    avatar,
    driver_license,
    avatar_url,
  }: IUser): IUserResponseDTO {
    const user = instanceToInstance({
      email,
      name,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
