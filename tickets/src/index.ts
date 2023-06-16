import mongoose from 'mongoose';
import { app } from './app';
// Database and server startup
const start = async () => {
  if (!process.env.JWT_KEY) {
    // make sure this secret exists
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI must be defined');
  }
  try {
    // run kubectl port-forward svc/tickets-mongo-srv 27017:27017 to forward port for local GUI
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDb Connection Successful');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('listening on port 3000');
  });
};

start();
