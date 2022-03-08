'use strict'

import express from 'express';

import * as forumController from '../controller/forum.js';
import * as validationUtil from '../util/validation.js';
import * as authUtil from '../util/auth.js';


const router = express.Router();


// GET /forums
// GET /forums?username=username
router.get('/', forumController.getForums);

// GET /forums/:forumid
router.get('/:id', forumController.getForumbyId);

// POST /forums
router.post('/', authUtil.checkAuth, validationUtil.validateForum, forumController.createForum);

// PUT /forums/:forumid
router.put('/:id', authUtil.checkAuth, validationUtil.validateForum, forumController.updateForum);

// DELETE /forums/:forumid
router.delete('/:id', authUtil.checkAuth, forumController.removeForum);


export default router;