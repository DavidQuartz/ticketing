import express from 'express';
import { json } from 'body-parser';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentuserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler as GlobalErrorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-errors';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
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

// Database and server startup
const start = async () => {
  if (!process.env.JWT_KEY) {
    // make sure this secret exists
    throw new Error('JWT_KEY must be defined');
  }

  try {
    // run kubectl port-forward svc/auth-mongo-srv 27017:27017 to forward port for local GUI
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('MongoDb Connection Successful');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
