'use strict'

import jwt from 'jsonwebtoken';

import * as userData from '../db/interface/user.js';
import * as cryptoUtil from '../util/crypto.js';

import { config } from '../config/config.js';


const unauthorizedMessage = { message: 'Unauthorized' };


export async function createToken(id) {
  const encryptionKey = await cryptoUtil.generateEncryptionKey();
  const encryptedData = await cryptoUtil.encrypt(JSON.stringify({ id: id }));
  return jwt.sign(
    { data: encryptedData },
    encryptionKey,
    { expiresIn: config.enc.expiresInSeconds }
  );
}

export async function checkAuth(req, res, next) {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(unauthorizedMessage);
  }

  const token = authHeader.split(' ')[1];
  const encryptionKey = await cryptoUtil.generateEncryptionKey();

  jwt.verify(
    token,
    encryptionKey,
    async (error, payload) => {
      if (error) {
        return res.status(401).json(unauthorizedMessage);
      }

      const decryptedData = await cryptoUtil.decrypt(payload.data, 'utf8');
      const data = JSON.parse(decryptedData);

      const user = await userData.findById(data.id);
      if (!user) {
        return res.status(401).json(unauthorizedMessage);
      }
      req.userId = user.id;
      next();
    }
  );
}