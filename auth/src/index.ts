import mongoose from 'mongoose';
import { app } from './app';
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
