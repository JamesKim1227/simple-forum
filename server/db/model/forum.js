'use strict '

import Sequelize from 'sequelize';
import { sequelize } from '../connection.js';
import { User } from './user.js';

const dataTypes = Sequelize.DataTypes;

export const Forum = sequelize.define(
  'forum',
  {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    subject: {
      type: dataTypes.STRING(128),
      allowNull: false,
    },
    content: {
      type: dataTypes.TEXT,
      allowNull: true,
    },
  },
  { timestamps: true }
);

// Add a foreign key to forums table
Forum.belongsTo(User);