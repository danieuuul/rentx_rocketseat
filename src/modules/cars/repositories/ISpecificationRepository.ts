import { ICreateSpecificationDTO } from "../dtos/ICreateSpecificationDTO";
import ISpecification from "../entities/ISpecification";

interface ISpecificationRepository {
  findByName(name: string): Promise<ISpecification>;
  list(): Promise<ISpecification[]>;
  create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<ISpecification>;
  findByIds(ids: string[]): Promise<ISpecification[]>;
}

export { ISpecificationRepository };
