'use strict'

import express from 'express';

import * as authController from '../controller/auth.js';
import * as validationUtil from '../util/validation.js';
import * as authUtil from '../util/auth.js';


const router = express.Router();


// POST /auth/signup
router.post('/signup', validationUtil.validateSignup, authController.signup);

// POST /auth/signin
router.post('/signin', validationUtil.validateSignin, authController.signin);

// POST /auth/me
router.post('/me', authUtil.checkAuth, authController.me);

// PUT /auth/edit
router.put('/edit', authUtil.checkAuth, validationUtil.validateEdit, authController.edit);

// DELETE /auth/dropout
router.delete('/dropout', authUtil.checkAuth, authController.dropout);

export default router;