import { Expose } from "class-transformer";
import { v4 as uuidv4 } from "uuid";

class IUser {
  id?: string;

  name: string;

  password: string;

  email: string;

  driver_license: string;

  is_admin: boolean;

  avatar?: string;

  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.disk) {
      case "local":
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case "s3":
        return `${process.env.AWS_BUCKER_URL}/avatar/${this.avatar}`;
      default:
        return null;
    }
  }
  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.created_at = new Date();
    }
  }
}

export default IUser;
