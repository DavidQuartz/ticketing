import mongoose from 'mongoose';
import { Password } from '../utilities/password';

// An interface that describes the properties
// that are required to create a new user
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

// An interface that describes the properties
// that a user document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre('save', async function (done) {
  /**
   * If the password is not being set/modified
   * We will not run this
   * The user might be updating other fields
   * And we dont want to rehash their password in that event
   */
  if (this.isModified('password')) {
    const hashedPassword = await Password.toHash(this.get('password'));
    console.log('hashed password', hashedPassword);
    this.set('password', hashedPassword);
  }
  done();
});

// This is what we will create new users with
// this will provide type checking for user model
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
