import { User } from '../components/types/User.vue';
import { getRequest, postRequest } from './requests';

const baseUrl = import.meta.env.VITE_BASE_URL;

class UserService {
  async signup(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      const payload = {
        firstName,
        lastName,
        username,
        email,
        password,
      };
      const user = await postRequest(`${baseUrl}/auth/register`, payload);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const payload = { email, password };
      const user = await postRequest(`${baseUrl}/auth/login`, payload);
      return user;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUsername(userId: string) {
    try {
      const userData: User = await getRequest(`${baseUrl}/users/${userId}`);
      return userData.username;
    } catch (error) {
      console.log(error);
    }
  }
}

export default UserService;
