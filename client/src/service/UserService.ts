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
      const userData = await postRequest(`${baseUrl}/auth/register`, formData);

      localStorage.setItem('jwtToken', userData.token);

      return userData.user;
    } catch (error) {
      console.error(error);
    }
  }

  async login(email: string, password: string) {
    try {
      const payload = { email, password };
      const userData = await postRequest(`${baseUrl}/auth/login`, payload);

      localStorage.setItem('jwtToken', userData.token);

      return userData;
    } catch (error) {
      console.error(error);
    }
  }

  async getUsername() {
    try {
      const userData: User = await getRequest(`${baseUrl}/user/`);
      return userData.username;
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserService;
