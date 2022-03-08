'use strict'

import Sequelize from 'sequelize';
import { config } from '../config/config.js';


const { host, port, user, password, database } = config.db;


export const sequelize = new Sequelize.Sequelize(
  database,
  user,
  password,
  {
    host,
    port,
    dialect: 'postgres',
    logging: true,
  }
);