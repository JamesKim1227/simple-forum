'use strict'

import express from 'express';
import * as forumController from '../controller/forum.js';

const router = express.Router();

// GET /forums
// GET /forums?username=username
router.get('/', forumController.getForums);

// GET /forums/:forumid
router.get('/:id', forumController.getForumbyId);

// POST /forums
router.post('/', forumController.createForum);

// PUT /forums/:forumid
router.put('/:id', forumController.updateForum);

// DELETE /forums/:forumid
router.delete('/:id', forumController.removeForum);


export default router;