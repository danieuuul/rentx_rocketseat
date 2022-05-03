import { v4 as uuidv4 } from "uuid";

import ISpecification from "./ISpecification";

class ICar {
  id?: string;
  name: string;
  description: string;
  liscence_plate: string;
  brand: string;
  daily_rate: number;
  fine_amount: number;
  available: boolean;
  category_id: string;
  specifications: ISpecification[];
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
      this.created_at = new Date();
    }
  }
}

export default ICar;
