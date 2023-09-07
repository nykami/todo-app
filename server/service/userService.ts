import { userModel } from '../model/userModel';

class UserService {
  async createUser(values: Record<string, any>) {
    return new userModel(values).save();
  }

  async getUserById(id: string) {    
    return userModel.findById(id);
  }

  async getUserByEmail(email: string) {
    return userModel.findOne({ email: email });
  }
}

export default new UserService();
