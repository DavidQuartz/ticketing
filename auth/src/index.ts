import express from 'express';
import { json } from 'body-parser';
import { currentuserRouter } from './routes/current-user';
import { signupRouter } from './routes/signup';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { errorHandler as GlobalErrorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-errors';
import mongoose from 'mongoose';

const app = express();
app.use(json());

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
  try {
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
