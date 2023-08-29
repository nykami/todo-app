import { ref } from 'vue';
import { User } from '../components/types/User.vue';
class UserService {
  user = ref<User>();

  async signup(
    firstName: string,
    lastName: string,
    username: string,
    email: string,
    password: string,
  ): Promise<User | null> {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName,
          lastName,
          username,
          email,
          password,
        }),
      };

      const response = await fetch(
        `http://localhost:8080/auth/register`,
        requestOptions,
      );

      if (response.ok) {
        const user = await response.json();
        return user as User;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async login(email: string, password: string): Promise<User | null> {
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      };

      const response = await fetch(
        `http://localhost:8080/auth/login`,
        requestOptions,
      );

      if (response.ok) {
        const user = await response.json();
        return user as User;
      } else {
        return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async getUser(userId: string) {
    try {
      const response = await fetch(`http://localhost:8080/users/${userId}`);

      if (response.ok) {
        const userData = await response.json();
        this.user.value = userData;
      } else {
        console.log("couldn't get user with id ,", userId);
      }
    } catch (error) {
      console.log(error);
    }
  }

  getUsername() {
    return this.user.value ? this.user.value.username : '';
  }
}

export default UserService;
