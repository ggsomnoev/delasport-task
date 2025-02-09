import 'dotenv/config';
import logger from '../src/utils/logger';
import { Dialect } from 'sequelize';

type ConfigKey = 'local';

const config: Record<
  ConfigKey,
  {
    username: string;
    password: string;
    database: string;
    host: string;
    dialect: Dialect;
    logging: (msg: string) => void;
  }
> = {
  local: {
    username: process.env.DB_USER as string,
    password: process.env.DB_PASSWORD as string,
    database: process.env.DB_NAME as string,
    host: process.env.DB_HOST as string,
    dialect: 'postgres' as Dialect,
    // In order to see logs put severity to info and above.
    logging: (msg: string) => logger.debug(msg),
  },
};

const currentEnv = process.env.NODE_ENV as ConfigKey;
const dbConfig = config[currentEnv];

export { dbConfig };
