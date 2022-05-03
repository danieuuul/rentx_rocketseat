import { UserRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import { UserTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UserTokenRepositoryInMemory";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/MailProviderInMemory";
import AppError from "@shared/errors/AppError";

import { SendForgottenPasswordMailService } from "./SendForgottenPasswordMailService";

let userRepositoryInMemory: UserRepositoryInMemory;
let userTokenRepositoryInMemory: UserTokenRepositoryInMemory;
let dateProvider: DateFnsProvider;
let mailProvider: MailProviderInMemory;
let sendForgottenPasswordMailService: SendForgottenPasswordMailService;

describe("Send forgot mail", () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    userTokenRepositoryInMemory = new UserTokenRepositoryInMemory();
    dateProvider = new DateFnsProvider();
    mailProvider = new MailProviderInMemory();
    sendForgottenPasswordMailService = new SendForgottenPasswordMailService(
      userRepositoryInMemory,
      userTokenRepositoryInMemory,
      dateProvider,
      mailProvider
    );
  });
  it("should be able to send a forgot password mail to a user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await userRepositoryInMemory.create({
      driver_license: "BqR9RL",
      email: "dukefi@vulevesi.tt",
      name: "Travis Byrd",
      password: "123",
    });

    await sendForgottenPasswordMailService.run("dukefi@vulevesi.tt");

    expect(sendMail).toHaveBeenCalled();
  });
  it("should not be able to send an email if user does not exists", async () => {
    await expect(
      sendForgottenPasswordMailService.run("naoexiste@email")
    ).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to createan user token", async () => {
    await userRepositoryInMemory.create({
      driver_license: "BqR9RL",
      email: "dukefi@vulevesi.tt",
      name: "Travis Byrd",
      password: "123",
    });
    const generateToken = jest.spyOn(userTokenRepositoryInMemory, "create");

    await sendForgottenPasswordMailService.run("dukefi@vulevesi.tt");
    expect(generateToken).toBeCalled();
  });
});
