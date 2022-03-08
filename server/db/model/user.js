'use strict'

import Sequelize from 'sequelize';
import { sequelize } from '../connection.js';

const dataTypes = Sequelize.DataTypes;

export const User = sequelize.define(
  'user',
  {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: dataTypes.STRING(128),
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING(256),
      allowNull: false,
    }
  },
  { timestamps: true }
);