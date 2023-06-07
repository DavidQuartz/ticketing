import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { currentuserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import {
  errorHandler as GlobalErrorHandler,
  NotFoundError,
} from '@nantoo/tickets';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);

app.use(currentuserRouter);
app.use(signupRouter);
app.use(signoutRouter);
app.use(signinRouter);

// this will catch routes we have not defined
app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

// This should be the last middleware
app.use(GlobalErrorHandler);

export { app };
