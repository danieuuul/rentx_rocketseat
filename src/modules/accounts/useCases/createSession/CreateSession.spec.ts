import AppError from "@error/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";

import { CreateUserService } from "../createUser/CreateUserService";
import { CreateSessionService } from "./CreateSessionService";

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;
let dateProvider: DateFnsProvider;
let createSessionService: CreateSessionService;
let createUserService: CreateUserService;

describe("Authenticate user", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    dateProvider = new DateFnsProvider();
    createUserService = new CreateUserService(userRepositoryInMemory);
    createSessionService = new CreateSessionService(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider
    );
  });
  it("should be able to create a session for a user", async () => {
    const newUser: ICreateUserDTO = {
      driver_license: "1111",
      email: "user@test.com",
      name: "User Test",
      password: "123456",
    };
    await createUserService.run(newUser);
    const response = await createSessionService.run({
      email: newUser.email,
      password: newUser.password,
    });
    expect(response).toHaveProperty("token");
  });
  it("should not be able to create a session for a non-existent user", () => {
    expect(async () => {
      await createSessionService.run({
        email: "false@test.com",
        password: "false",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it("should not be able to create a session if the password does not match", () => {
    expect(async () => {
      const newUser: ICreateUserDTO = {
        driver_license: "1111",
        email: "user@test.com",
        name: "User Test",
        password: "123456",
      };
      await createUserService.run(newUser);
      await createSessionService.run({
        email: newUser.email,
        password: "incorrectpassword",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
