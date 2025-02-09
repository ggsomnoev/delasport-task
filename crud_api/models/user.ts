import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../src/database/db';

interface UserAttributes {
  id: string;
  name: string;
  surname: string;
  email: string;
  age: number;
  favorite_color?: string;
  contact_preference: Array<'email' | 'phone' | 'sms'>;
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: string;
  public name!: string;
  public surname!: string;
  public email!: string;
  public age!: number;
  public favorite_color?: string;
  public contact_preference!: Array<'email' | 'phone' | 'sms'>;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 120,
      },
    },
    favorite_color: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contact_preference: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isArrayOfValidOptions(value: Array<string>) {
          const validOptions = ['email', 'phone_call', 'sms'];
          value.forEach((v) => {
            if (!validOptions.includes(v)) {
              throw new Error('Invalid contact preference');
            }
          });
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
  }
);

export { UserCreationAttributes };
export default User;
