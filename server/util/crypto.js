'use strict'

import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { decode } from 'punycode';

import { config } from '../config/config.js';


const SALT_ROUNDS = 10;
const IV_LENGTH = 16;


export async function createPassword(password) {
    return await bcrypt.hash(password, SALT_ROUNDS);
}

export async function comparePassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

export async function generateEncryptionKey() {
    const salt = config.enc.salt;
    const iterations = 1000;
    const keyLen = 32;
    return crypto.pbkdf2Sync(config.enc.secretKey, salt, iterations, keyLen, 'sha256');
}

export async function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const encryptionKey = await generateEncryptionKey();
    const cipher = crypto.createCipheriv('aes-256-cbc', encryptionKey, iv);

    let encryptedData = cipher.update(text);
    encryptedData = Buffer.concat([iv, encryptedData, cipher.final()]);
    
    return encryptedData.toString('base64');
}

export async function decrypt(text, resultEncoding = undefined) {
    const decodedData = Buffer.from(text, 'base64');
    const iv = decodedData.slice(0, IV_LENGTH);
    const encryptedData = decodedData.slice(IV_LENGTH);
    const encryptionKey = await generateEncryptionKey();
    const decipher = crypto.createDecipheriv('aes-256-cbc', encryptionKey, iv);

    let decryptedData = decipher.update(encryptedData);
    decryptedData = Buffer.concat([decryptedData, decipher.final()]);

    return resultEncoding ? decryptedData.toString(resultEncoding) : decryptedData;
}