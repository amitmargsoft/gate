import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateFilterData1590521920166 implements MigrationInterface {
  name = 'CreateFilterData1590521920166';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "gate_filter_data" (
        seq_no serial4 NOT NULL,
        case_id varchar NULL,
        gate_id varchar NULL,
        "timestamp" varchar NULL,
        tag_read_flag varchar NULL,
        tag_number varchar NULL,
        vehicle_read_flag varchar NULL,
        vehicle_no varchar NULL,
        vehicle_type_read_flag varchar NULL,
        vehicle_type varchar NULL,
        vehicle_height_ft float8 NULL,
        anpr_image_path varchar NULL,
        anpr_video_path varchar NULL,
        vf_image_path varchar NULL,
        vf_video_path varchar NULL,
        mineral_type varchar NULL,
        loaded varchar NULL,
        height float8 NULL,
        mineral_volume float8 NULL,
        create_date timestamp NULL,
        retry_flag bool NULL,
        create_by varchar NULL,
        update_date timestamp NULL,
        update_by varchar NULL,
        other_tag varchar NULL,
        mineral_type_confidence varchar NULL,
        loaded_confidence varchar NULL,
        covered varchar NULL,
        covered_confidence varchar NULL,
        overloading varchar NULL,
        overloading_confidence varchar NULL,
        mineral_volume_confidence varchar NULL,
       created_at TIMESTAMP NOT NULL DEFAULT now(), 
       updated_at TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT 
       PK_a3ffb1c0c8416b9fc6f66 PRIMARY KEY ("seq_no"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "gate_filter_data"`, undefined);
  }
}
