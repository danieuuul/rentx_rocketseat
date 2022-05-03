import { inject, injectable } from "tsyringe";

import ISpecification from "@modules/cars/entities/ISpecification";
import { ISpecificationRepository } from "@modules/cars/repositories/ISpecificationRepository";

@injectable()
class ListSpecificationsService {
  constructor(
    @inject("SpecificationRepository")
    private specificationRepository: ISpecificationRepository
  ) {}

  async run(): Promise<ISpecification[]> {
    const specifications = await this.specificationRepository.list();
    return specifications;
  }
}

export { ListSpecificationsService };
