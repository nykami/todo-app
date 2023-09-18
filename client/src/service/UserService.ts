import { postRequest } from './requests';

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
      localStorage.setItem('username', userData.user.username);

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
      localStorage.setItem('username', userData.user.username);

      return userData;
    } catch (error) {
      console.error(error);
    }
  }

  getUsername() {
    try {
      return localStorage.getItem('username');
    } catch (error) {
      console.error(error);
    }
  }
}

export default UserService;
