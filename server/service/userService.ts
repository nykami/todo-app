import { userModel } from '../model/userModel';

export const createUser = (values: Record<string, any>) =>
  new userModel(values).save();

export const getUserById = (id: string) => userModel.findById(id);

export const getUserByEmail = (email: string) => userModel.findOne({ email: email });
