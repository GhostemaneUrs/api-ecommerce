import PostgreSQL from '../config/postgresql';
import { seedUsers } from './userSeeder';
import { seedProducts } from './productSeeder';

const seedDatabase = async (): Promise<void> => {
  try {
    const dataSource = await PostgreSQL.getInstance();
    await seedUsers();
    await seedProducts();

    console.log('Database seeded successfully 🌱');
    await dataSource.destroy();
  } catch (error) {
    console.log('🚀 ~ seedDatabase ~ error:', error);
    process.exit(1);
  }
};

seedDatabase();
