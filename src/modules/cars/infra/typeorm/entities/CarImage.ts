import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import ICarImage from "@modules/cars/entities/ICarImage";

@Entity("car_image")
class CarImage implements ICarImage {
  @PrimaryColumn()
  id?: string;

  @Column()
  car_id: string;

  @Column()
  image_name: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default CarImage;
