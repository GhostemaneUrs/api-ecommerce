import 'reflect-metadata';
import { DateTime } from 'luxon';
import { DataSource } from 'typeorm';
import { User } from '../entity/user';
import { Product } from '../entity/product';
import { Quotation } from '../entity/quotation';

class PostgreSQL {
  private static instance: DataSource;

  private constructor() {}

  static async getInstance(): Promise<DataSource> {
    if (!PostgreSQL.instance) {
      PostgreSQL.instance = new DataSource({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        synchronize: process.env.STAGE === 'dev',
        logging: process.env.STAGE === 'dev',
        entities: [Product, User, Quotation],
        migrations: [],
      });

      try {
        await PostgreSQL.instance.initialize();
        const result = await PostgreSQL.instance.query('SELECT NOW()');
        console.log(
          `Successful database connection at ${DateTime.fromJSDate(
            result[0].now
          )
            .setZone('America/Bogota')
            .setLocale('es-CO')
            .toFormat('dd LLLL yyyy')} 🚀`
        );
      } catch (err) {
        console.error('Error during Data Source initialization:', err);
        throw err; // Propaga el error para manejarlo más arriba si es necesario
      }
    }
    return PostgreSQL.instance;
  }
}

export default PostgreSQL;
