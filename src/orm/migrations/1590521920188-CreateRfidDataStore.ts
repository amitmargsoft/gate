import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRfidDataSotre1590521920166 implements MigrationInterface {
  name = 'CreateRfidDataSotre1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_rfid_data_store" (
        seq_no serial4 NOT NULL,
        tid varchar NULL,
        "timestamp" varchar NULL,
        vehicle_no varchar NULL,
        db_match varchar NULL,
        inserted_at bigint  NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f94 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_rfid_data_store"`, undefined);
  }
}
