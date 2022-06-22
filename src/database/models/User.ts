import { Model, STRING } from 'sequelize';

import db from '.';

class User extends Model {
  declare id: number;
  declare username: string;
  declare email: string;
  declare password: string;
};

User.init(
  {
    username: {
      type: STRING,
    },
    email: {
      type: STRING,
    },
    password: {
      type: STRING,
    },
  },
  {
    sequelize: db,
    timestamps: false,
  },
);

export default User;
