'use strict'

import { validationResult } from "express-validator";
import { body } from 'express-validator';


export const validateSignin = [
  body('username').trim().isLength({ min: 3 }).withMessage('The username must be at least 3 characters.'),
  body('password').trim().isLength({ min: 4 }).withMessage('The password must be at least 4 characters.'),
  checkValidationResult,
];

export const validateSignup = [
  ...validateSignin,
  body('email').trim().isEmail().withMessage('The email is invalid.'),
  checkValidationResult,
];

export const validateEdit = [
  body('old_password').trim().isLength({ min: 4 }).withMessage('The password must be at least 4 characters.').optional({ checkFalsy: true }),
  body('new_password').trim().isLength({ min: 4 }).withMessage('The password must be at least 4 characters.').optional({ checkFalsy: true }),
  body('email').trim().isEmail().normalizeEmail().withMessage('The email is invalid.').optional({ checkFalsy: true }),
  checkValidationResult,
];

export const validateForum = [
  body('subject').trim().isLength({ min: 1, max: 128 }).withMessage('The subject must be at least 1 character.'),
  body('content').trim().isLength({ min: 1 }).withMessage('The content must be at least 1 character.'),
  checkValidationResult,
];

export async function checkValidationResult (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }
  return next();
}

export function checkEnvParam(keyName, defaultValue = undefined) {
  const value = process.env[keyName] || defaultValue;
  if (!value) {
    throw new Error(`Invalid key(${keyName}) value.`);
  }
  return value;
}

export function checkEnvParamNumber(keyName, defaultValue = undefined) {
  const value = process.env[keyName] || defaultValue;
  if (!value) {
    throw new Error(`Invalid key (${keyName}) value`);
  }
  return Number(value);
}
