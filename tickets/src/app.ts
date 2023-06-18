import express from 'express';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import {
  errorHandler as GlobalErrorHandler,
  NotFoundError,
  currentUser,
} from '@nantoo/tickets';
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
// This has to be after cookieSession and before routes
app.use(currentUser);
app.use(createTicketRouter);
app.use(showTicketRouter);

// this will catch routes we have not defined
app.all('*', async (req, res, next) => {
  next(new NotFoundError());
});

// This should be the last middleware
app.use(GlobalErrorHandler);

export { app };
