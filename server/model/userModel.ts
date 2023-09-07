import { Schema, Model, model } from 'mongoose';

export interface IUser {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const userModel: Model<IUser> = model<IUser>('User', userSchema);
