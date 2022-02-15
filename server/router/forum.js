'use strict'

import express from 'express';
import { body } from 'express-validator';

import * as forumController from '../controller/forum.js';
import { validate } from '../middleware/validator.js';

const router = express.Router();

const validateForum = [
    body('subject').trim().isLength({ min: 1 }).withMessage('The subject must be at least 1 character.'),
    body('content').trim().isLength({ min: 1 }).withMessage('The content must be at least 1 character.'),
    validate,
];

// GET /forums
// GET /forums?username=username
router.get('/', forumController.getForums);

// GET /forums/:forumid
router.get('/:id', forumController.getForumbyId);

// POST /forums
router.post('/', validateForum, forumController.createForum);

// PUT /forums/:forumid
router.put('/:id', validateForum, forumController.updateForum);

// DELETE /forums/:forumid
router.delete('/:id', forumController.removeForum);


export default router;