import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/Users';

export class AddPremiumRoleToOneUser1699836534813 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const userToUpdateRole = await userRepository.findOne({ where: { email: 'flindenm@hotmail.com' } });

    if (userToUpdateRole) {
      userToUpdateRole.role = 'Premium';
      await userRepository.save(userToUpdateRole);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const userToUpdateRole = await userRepository.findOne({ where: { email: 'flindenm@hotmail.com' } });

    if (userToUpdateRole) {
      userToUpdateRole.role = 'Free';
      await userRepository.save(userToUpdateRole);
    }
  }
}
