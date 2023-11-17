import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entity/Users';
import { userRoles } from '../constants/userRoles';

/**
 * Changes one user (Fabrício) to have a Premium role
 */
export class AddPremiumRoleToOneUser1699836534813 implements MigrationInterface {
  /**
   * up
   *
   * Finds user Fabrício by his email and updates his role to "Premium"
   *
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const userToUpdateRole: User | undefined = await userRepository.findOne({ where: { email: 'flindenm@hotmail.com' } });
    const userId: number = userToUpdateRole.id;

    if (userToUpdateRole) {
      await userRepository.update(userId, {
        role: userRoles['Premium']
      });
    }
  }

  /**
   * down
   *
   * Reverts the action of the up method above, changing Fabrício's user to having role "Free".
   *
   * @param queryRunner - QueryRunner object, used to make database queries.
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const userRepository = queryRunner.manager.getRepository(User);

    const userToUpdateRole: User | undefined = await userRepository.findOne({ where: { email: 'flindenm@hotmail.com' } });
    const userId: number = userToUpdateRole.id;

    if (userToUpdateRole) {
      await userRepository.update(userId, {
        role: userRoles['Free']
      });
    }
  }
}
