import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

import IUser from "@modules/accounts/entities/IUser";

@Entity("user")
class User extends IUser {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  is_admin: boolean;

  @Column()
  avatar?: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    super();
    if (!this.id) {
      this.id = uuidv4();
    }
  }
}

export default User;
