import ISpecification from "../entities/ISpecification";

interface ICreateCarDTO {
  name: string;
  description: string;
  daily_rate: number;
  liscence_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
  specifications?: ISpecification[];
  id?: string;
}

export { ICreateCarDTO };
