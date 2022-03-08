'use strict'

import * as cryptoUtil from '../util/crypto.js';

const text = '1234567890';

console.log(`===== encrypt =====`);

const encrypted = await cryptoUtil.encrypt(text);

console.log(encrypted);

console.log(`===== decrypt =====`);

const decrypted = await cryptoUtil.decrypt(encrypted, 'utf8');

console.log(decrypted);

console.log(`The result is ${text === decrypted}`);