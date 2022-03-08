import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAnprsDataStore1590521920166 implements MigrationInterface {
  name = 'CreateAnprsDataStore1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_anpr_data_store" (
       "seq_no" SERIAL4 NOT NULL, 
        device_id varchar NULL,
        event_timestamp varchar NULL,
        match_type varchar NULL,
        direction varchar NULL,
        priority varchar NULL,
        wait_time varchar NULL,
        make varchar NULL,
        aux_lp varchar NULL,
        det_confidence int4 NULL,
        confidence int4 NULL,
        anpr_video_path varchar NULL,
        anpr_image_path varchar NULL,
        vf_image_path varchar NULL,
        vf_video_path varchar NULL,
        db_match bool NULL,
         inserted_at timestamp NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
        "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
        "PK_a3ffb1c0c8416b9fc6f907b7434" PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_anpr_data_store"`, undefined);
  }
}
