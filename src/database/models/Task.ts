import { Model, STRING, INTEGER } from 'sequelize';

import { TaskStatusT } from '../../@types/types/task.type';

import db from '.';

import User from './User';

class Task extends Model {
  declare id: number;
  declare title: string;
  declare description: string;
  declare status: TaskStatusT;
  declare userId: number;
};

Task.init(
  {
    title: {
      type: STRING,
    },
    description: {
      type: STRING,
    },
    status: {
      type: STRING,
    },
    userId: {
      type: INTEGER,
    },
  },
  {
    sequelize: db,
    timestamps: false,
  },
);

Task.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

export default Task;
