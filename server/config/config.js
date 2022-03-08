'use strict'

import dotenv from 'dotenv';

import { checkEnvParam, checkEnvParamNumber } from '../util/validation.js';

// load .env file contents into process.env
dotenv.config();

export const config = {
  host: {
    port: checkEnvParamNumber('HOST_PORT', 8081),
  },
  db: {
    host: checkEnvParam('DB_HOST', 'localhost'),
    port: checkEnvParamNumber('DB_PORT', 5432),
    user: checkEnvParam('DB_USER', 'postgres'),
    password: checkEnvParam('DB_PASSWORD'),
    database: checkEnvParam('DB_DATABASE', 'postgres'),
  },
  enc: {
    secretKey: checkEnvParam('ENC_SECRET_KEY'),
    salt: checkEnvParam('ENC_SALT'),
    expiresInSeconds: checkEnvParamNumber('ENC_EXPIRES_IN_SECONDS', 3600),
  },
};