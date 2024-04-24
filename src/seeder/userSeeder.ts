import { User } from '../entity/user';
import PostgreSQL from '../config/postgresql';

export const seedUsers = async (): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();

    const usersData = [
      {
        first_name: 'John',
        last_name: 'Doe',
        email: 'johndoe@example.com',
        code: '+1',
        phone: '1234567890',
        active: true,
      },
      {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'janesmith@example.com',
        code: '+44',
        phone: '9876543210',
        active: true,
      },
      {
        first_name: 'Michael',
        last_name: 'Johnson',
        email: 'michaeljohnson@example.com',
        code: '+61',
        phone: '4567890123',
        active: false,
      },
      {
        first_name: 'Emily',
        last_name: 'Brown',
        email: 'emilybrown@example.com',
        code: '+33',
        phone: '8901234567',
        active: true,
      },
      {
        first_name: 'Daniel',
        last_name: 'Lee',
        email: 'daniellee@example.com',
        code: '+81',
        phone: '2345678901',
        active: true,
      },
      {
        first_name: 'Olivia',
        last_name: 'Taylor',
        email: 'oliviataylor@example.com',
        code: '+49',
        phone: '6789012345',
        active: false,
      },
      {
        first_name: 'Matthew',
        last_name: 'Anderson',
        email: 'matthewanderson@example.com',
        code: '+91',
        phone: '0123456789',
        active: true,
      },
      {
        first_name: 'Sophia',
        last_name: 'Wilson',
        email: 'sophiawilson@example.com',
        code: '+39',
        phone: '3456789012',
        active: true,
      },
      {
        first_name: 'David',
        last_name: 'Thomas',
        email: 'davidthomas@example.com',
        code: '+55',
        phone: '5678901234',
        active: false,
      },
      {
        first_name: 'Ava',
        last_name: 'Jackson',
        email: 'avajackson@example.com',
        code: '+61',
        phone: '9012345678',
        active: true,
      },
    ] as User[];

    for (const user of usersData) {
      const userExist = await dataSource.getRepository(User).findOneBy({
        email: user.email,
      });

      if (!userExist) {
        dataSource.getRepository(User).create(user);
        await dataSource.getRepository(User).save(user);
      }
    }
  } catch (error) {
    console.log('🚀 ~ seedUsers ~ error:', error);
  }
};
