import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUserChangeColumnsNames1646427307411
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("user", "driverLiscence", "driver_license");
    await queryRunner.renameColumn("user", "isAdmin", "is_admin");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn("user", "driver_license", "driverLiscence");
    await queryRunner.renameColumn("user", "is_admin", "isAdmin");
  }
}
