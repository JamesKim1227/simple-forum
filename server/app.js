'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import forumRouter from './router/forum.js';
import memberRouter from './router/member.js';
import commentRouter from './router/comment.js';

const app = express();
const PORT = 8081;

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/forums', forumRouter);
app.use('/members', memberRouter);
app.use('/comments', commentRouter);


// invalid url handler
app.use((req, res, next) => {
  res.sendStatus(404);
});

// error handler
app.use((error, req, res, next) => {
  console.error(error);
  res.sendStatus(500);
});

app.listen(PORT);