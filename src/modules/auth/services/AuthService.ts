import { instance } from "./authInterceptor";
import { Profile, User } from "../../../shared/models/User";


export const login = async (email: string, password: string): Promise<Profile> => {
  try {
    const response = await instance.post('/login', {email, password}, {
      headers: {
        'Access-Control-Expose-Headers': '*, Authorization'
      }
    });
    if(response?.status === 200) {
      const token = response.headers?.authorization;
      const payload = token.replace("Bearer ", "")?.split(".")[1];
      const user = JSON.parse(window.atob(payload));

      return {...user, token};
    }
		throw response.data;
  } catch(e) {
    throw e;
  }
};

export const register = async (user: User): Promise<User> => {
	try {
    const response = await instance.post('/register', user);
    if(response.status !== 201) {
      throw response.data;
    }
    return response.data;
  } catch(e) {
    throw e;
  }
}