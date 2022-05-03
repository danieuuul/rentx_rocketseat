import { v4 as uuidv4 } from "uuid";

class IRental {
  id?: string;
  car_id: string;
  user_id: string;
  total: number;
  start_date: Date;
  end_date: Date;
  expected_return_date: Date;
  created_at: Date;
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.created_at = new Date();
      this.start_date = new Date();
    }
  }
}

export default IRental;
