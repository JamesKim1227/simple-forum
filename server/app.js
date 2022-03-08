'use strict'

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import forumRouter from './routes/forum.js';
import authRouter from './routes/auth.js';
import commentRouter from './routes/comment.js';

import { config } from './config/config.js';
import { sequelize } from './db/connection.js';
import { InvalidUrlRequest, serverError } from './routes/error.js';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/auth', authRouter);
app.use('/forums', forumRouter);
app.use('/comments', commentRouter); // Not implemented yet

app.use(InvalidUrlRequest);
app.use(serverError);

// Sync all models to DB
sequelize.sync()
.then(() => {
  // Listen to connections
  app.listen(config.host.port, () => {
    console.log(`Listening on port(${config.host.port})`);
  });
})
.catch((err) => {
  console.log(`Error occured(${err})`);
});