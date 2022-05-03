import { ICreateSpecificationDTO } from "@modules/cars/dtos/ICreateSpecificationDTO";
import ISpecification from "@modules/cars/entities/ISpecification";

import { ISpecificationRepository } from "../ISpecificationRepository";

class SpecificationRepositoryInMemory implements ISpecificationRepository {
  specifications: ISpecification[] = [];

  async findByName(name: string): Promise<ISpecification> {
    const specification = this.specifications.find((s) => s.name === name);
    return specification;
  }
  async list(): Promise<ISpecification[]> {
    return this.specifications;
  }
  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<ISpecification> {
    const specification = new ISpecification();
    Object.assign(specification, { name, description });
    this.specifications.push(specification);
    return specification;
  }
  async findByIds(ids: string[]): Promise<ISpecification[]> {
    return this.specifications.filter((s) => ids.includes(s.id));
  }
}

export { SpecificationRepositoryInMemory };
