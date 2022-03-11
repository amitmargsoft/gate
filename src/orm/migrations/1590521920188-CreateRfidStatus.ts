import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRfidStatus1590521920166 implements MigrationInterface {
  name = 'CreateRfidStatus1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_rfid_status" (
        seq_no serial4 NOT NULL,
        case_id varchar NULL,
        tag_send varchar NULL,
        tag_removed varchar NULL,
        inserted_at bigint  NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f78 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_rfid_status"`, undefined);
  }
}
