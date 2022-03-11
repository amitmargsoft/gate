import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAnprsRawStore1590521920166 implements MigrationInterface {
  name = 'CreateAnprsRawStore1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_anpr_raw_store" (
        seq_no SERIAL4 NOT NULL, 
        vehicle_no varchar NULL,
        vehicle_type varchar NULL,
        anpr_timestamp varchar NULL,
        inserted_at bigint NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(), 
        updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
        PK_a3ffb1c0c8416b9fc6f907b783 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_anpr_raw_store"`, undefined);
  }
}
