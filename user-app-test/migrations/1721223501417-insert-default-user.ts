import * as bcrypt from 'bcrypt';
import { User } from 'src/modules/users/entities/user.entity';
import { MigrationInterface, QueryRunner } from 'typeorm';
const DEFAULT_USER_EMAIL = 'example@example.com';
export class InsertDefaultUser1721223501417 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.manager.getRepository(User);

    await usersRepository.insert({
      name: 'Default User',
      email: DEFAULT_USER_EMAIL,
      age: 25,
      password: await bcrypt.hash('Test1234!', 10),
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const usersRepository = queryRunner.manager.getRepository(User);
    await usersRepository.delete({ email: DEFAULT_USER_EMAIL });
  }
}
