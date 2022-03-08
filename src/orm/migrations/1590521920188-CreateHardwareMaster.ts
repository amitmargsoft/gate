import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateHardwareMaster1590521920166 implements MigrationInterface {
  name = 'CreateHardwareMaster1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_hardware_master" (
        seq_no serial4 NOT NULL,
        gate_id varchar NULL,
        device_id varchar NULL,
        hardware_type varchar NULL,
        hardware_type_id varchar NULL,
        hardware_code varchar NULL,
        hardware_name varchar NULL,
        is_active bool NULL,
        current_status varchar NULL,
        create_by varchar NULL,
        create_date timestamp NULL,
        update_by varchar NULL,
        update_date timestamp NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f14 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_hardware_master"`, undefined);
  }
}
