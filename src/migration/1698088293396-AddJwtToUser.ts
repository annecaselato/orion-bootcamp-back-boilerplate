import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class AddJwtToUser1698088293396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Users" ADD COLUMN "authenticationToken" text NULL`
        );

        await queryRunner.query(
            `ALTER TABLE "Users" ADD COLUMN "passwordRecoveryToken" text NULL`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "Users" DROP COLUMN "authenticationToken"`
        );

        await queryRunner.query(
            `ALTER TABLE "Users" DROP COLUMN "passwordRecoveryToken"`
        );
    }

}
