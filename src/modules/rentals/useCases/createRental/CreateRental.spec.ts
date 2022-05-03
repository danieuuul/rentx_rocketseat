import { CarRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarRepositoryInMemory";
import { RentalRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalRepositoryInMemory";
import { DateFnsProvider } from "@shared/container/providers/DateProvider/implementations/DateFnsProvider";
import AppError from "@shared/errors/AppError";

import { CreateRentalService } from "./CreateRentalService";

let createRentalService: CreateRentalService;
let rentalRepository: RentalRepositoryInMemory;
let carRepository: CarRepositoryInMemory;
let dateFnsProvider: DateFnsProvider;

describe("Create a rental", () => {
  beforeEach(() => {
    rentalRepository = new RentalRepositoryInMemory();
    carRepository = new CarRepositoryInMemory();
    dateFnsProvider = new DateFnsProvider();
    createRentalService = new CreateRentalService(
      rentalRepository,
      carRepository,
      dateFnsProvider
    );
  });
  it("should not be able to create a new rental for with a rental in progress", async () => {
    await rentalRepository.create({
      user_id: "user_test1",
      car_id: "1",
      expected_return_date: new Date(2022, 10, 10),
    });
    await expect(
      createRentalService.run({
        user_id: "user_test2",
        car_id: "1",
        expected_return_date: dateFnsProvider.parse_Date_to_ISO(
          new Date(2022, 10, 10)
        ),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental for a user with a rental in progress", async () => {
    await rentalRepository.create({
      user_id: "user_test",
      car_id: "1",
      expected_return_date: new Date(2022, 10, 10),
    });
    await expect(
      createRentalService.run({
        user_id: "user_test",
        car_id: "5",
        expected_return_date: dateFnsProvider.parse_Date_to_ISO(
          new Date(2022, 10, 10)
        ),
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental that is less than 24 hours long ", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 11, 11, 9).getTime();
    });
    await expect(
      createRentalService.run({
        user_id: "user_test",
        car_id: "1",
        expected_return_date: dateFnsProvider.parse_Date_to_ISO(
          new Date(2022, 11, 12, 8, 59)
        ),
      })
    ).rejects.toBeInstanceOf(AppError);
  });
  it("should be able to create a new rental", async () => {
    jest.spyOn(Date, "now").mockImplementationOnce(() => {
      return new Date(2022, 11, 11, 9).getTime();
    });
    await carRepository.create({
      id: "1",
      brand: "Brand Test",
      name: "Test Car",
      liscence_plate: "ABC-1234",
      fine_amount: 100,
      category_id: "category_test",
      description: "Description Test",
      daily_rate: 10,
    });
    const rental = await createRentalService.run({
      user_id: "user_test",
      car_id: "1",
      expected_return_date: dateFnsProvider.parse_Date_to_ISO(
        new Date(2022, 11, 12, 9)
      ),
    });
    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });
});
