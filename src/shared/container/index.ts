import { container } from "tsyringe";

import "./providers";

import { UserTokenRepository } from "@modules/accounts/infra/typeorm/repositories/UserTokenRepository";
import { IUserTokenRepository } from "@modules/accounts/repositories/IUserTokenRepository";
import { CarRepository } from "@modules/cars/infra/typeorm/repositories/CarRepository";
import { ICarImageRepository } from "@modules/cars/repositories/ICarImageRepository";
import { ICarRepository } from "@modules/cars/repositories/ICarRepository";
import { RentalRepository } from "@modules/rentals/infra/typeorm/repositories/RentalRepository";
import { IRentalRepository } from "@modules/rentals/repositories/IRentalRepository";

import { UserRepository } from "../../modules/accounts/infra/typeorm/repositories/UserRepository";
import { IUserRepository } from "../../modules/accounts/repositories/IUserRepository";
import { CarImageRepository } from "../../modules/cars/infra/typeorm/repositories/CarImageRepository";
import { CategoryRepository } from "../../modules/cars/infra/typeorm/repositories/CategoryRepository";
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationRepository";
import { ICategoryRepository } from "../../modules/cars/repositories/ICategoryRepository";
import { ISpecificationRepository } from "../../modules/cars/repositories/ISpecificationRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IUserTokenRepository>(
  "UserTokenRepository",
  UserTokenRepository
);

container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  "SpecificationRepository",
  SpecificationRepository
);

container.registerSingleton<ICarRepository>("CarRepository", CarRepository);

container.registerSingleton<ICarImageRepository>(
  "CarImageRepository",
  CarImageRepository
);

container.registerSingleton<IRentalRepository>(
  "RentalRepository",
  RentalRepository
);
