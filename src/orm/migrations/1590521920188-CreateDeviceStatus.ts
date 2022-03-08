import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeviceStatus1590521920166 implements MigrationInterface {
  name = 'CreateDeviceStatus1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_device_status" (
       seq_no SERIAL4 NOT NULL, 
       gate_id varchar NULL,
       device_id varchar NULL,
       current_status varchar NULL,
       inserted_date timestamp NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f90 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_device_status"`, undefined);
  }
}
