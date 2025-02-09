import { Sequelize } from 'sequelize';
import { dbConfig } from '../../config/db';
import logger from '../utils/logger';

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    logging: dbConfig.logging,
  }
);

export async function connectToDB(): Promise<void> {
  try {
    await sequelize.authenticate();
    logger.info('Database connected successfully.');
  } catch (error) {
    logger.error('Database connection failed:', { error });
    process.exit(1);
  }
}
