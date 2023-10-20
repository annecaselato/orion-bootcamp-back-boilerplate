import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1697757144159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isNullable: false
          },
          {
            name: 'login',
            type: 'string',
            isNullable: false
          },
          {
            name: 'password',
            type: 'string',
            isNullable: false
          }
        ]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropTable('users');
  }
}
