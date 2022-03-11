import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTagVehicle1590521920166 implements MigrationInterface {
  name = 'CreateTagVehicle1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_tag_vehicle_map" (
        seq_no serial4 NOT NULL,
        vehicle_id varchar NULL,
        tag_id varchar NULL,
        enabled_flag varchar NULL,
        install_flag varchar NULL,
        vehicle_registration_no varchar NULL,
        vehicle_type varchar NULL,
        vehicle_district_name varchar NULL,
        vehicle_owner_name varchar NULL,
        vehicle_owner_mobile varchar NULL,
        vehicle_owner_email varchar NULL,
        vehicle_owner_address varchar NULL,
        vehicle_verification_status varchar NULL,
        vehicle_enabled_flag varchar NULL,
        tag_details varchar NULL,
        inserted_at bigint  NULL,
        inserted_by varchar NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f28 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_tag_vehicle_map"`, undefined);
  }
}
