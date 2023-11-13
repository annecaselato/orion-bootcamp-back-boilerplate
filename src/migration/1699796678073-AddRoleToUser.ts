import { MysqlDataSource } from '../config/database';
import { MigrationInterface, QueryRunner, Repository, TableColumn } from 'typeorm';
import { User } from '../entity/Users';

export class AddRoleToUser1699796678073 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'role',
        type: 'varchar',
        default: "'Free'",
        isNullable: false
      })
    );

    const USERS: Repository<User> = MysqlDataSource.getRepository(User);
    const allUsers: User[] = await USERS.find();

    for (const user of allUsers) {
      user.role = 'Free';
      await USERS.save(user);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'role');
  }
}
