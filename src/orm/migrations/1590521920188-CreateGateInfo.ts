import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGateInfo1590521920166 implements MigrationInterface {
  name = 'CreateGateInfo1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_info" (
        seq_no serial4 NOT NULL,
        gate_id varchar NULL,
        current_status varchar NULL,
        create_by varchar NULL,
        create_date timestamp NULL,
        update_by varchar NULL,
        update_date timestamp NULL,
        created_at TIMESTAMP NOT NULL DEFAULT now(), 
        updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
        PK_a3ffb1c0c8416b9fc6f54 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_info"`, undefined);
  }
}
