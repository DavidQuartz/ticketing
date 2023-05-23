import { Schema, model, Model, Document } from 'mongoose';

// An interface that describes the properties
// that are required to create a new user
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that describes the properties
// that a user model has
interface UserModel extends Model<UserDoc> {
  bulid(attributes: UserAttributes): UserDoc;
}

// An interface that describes the properties
// that a user document has
interface UserDoc extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema({
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

// This is what we will create new users with
// this will provide type checking for user model
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

const User = model<UserDoc, UserModel>('User', userSchema);

export { User };