import { User } from '../components/types/User.vue';
import { getRequest, postRequest } from './requests';

const baseUrl = import.meta.env.VITE_BASE_URL;

class UserService {
  async signup(formData: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) {
    try {
      const user = await postRequest(`${baseUrl}/auth/register`, formData);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async login(email: string, password: string){
    try {
      const payload = { email, password };
      const user = await postRequest(`${baseUrl}/auth/login`, payload);
      return user;
    } catch (error) {
      console.error(error);
    }
  }

  async getUsername(userId: string) {
    try {
      const userData: User = await getRequest(`${baseUrl}/user/${userId}`);
      return userData.username;
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserService;
