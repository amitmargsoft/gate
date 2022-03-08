import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRfidRawSotre1590521920166 implements MigrationInterface {
  name = 'CreateRfidRawSotre1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_rfid_raw_store" (
        seq_no serial4 NOT NULL,
        raw_data varchar NULL,
        inserted_at timestamp NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f88 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_rfid_raw_store"`, undefined);
  }
}
