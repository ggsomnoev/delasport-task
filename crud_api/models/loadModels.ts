import { sequelize } from '../src/database/db';
import User from './user';

const db = {
  sequelize,
  User,
};

export { User };
export default db;
