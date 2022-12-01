import { instance } from "./AdminInterceptors";
import { User } from "shared/models/User";
import Page from "shared/models/page";

const getUsers = async(page: number = 0, size: number = 20): Promise<Page<User> | undefined> => {
  try {
    const response = await instance.get('/users', { params: { page, size }});
    if(response?.status !== 200) throw new Error('Error en al solicitar datos de los usuarios');
    const pageUser: Page<User> = response.data;
    return pageUser;
  } catch(e) {
    return undefined;
  }
}

const getUsersByName = async(pageNumber: number = 0, size: number = 20, name: string): Promise<Page<User>> => {
  try {
    const response = await instance.get('/users/search', {
      params: { pageNumber, size, name}
    });
    if(response?.status !== 200) throw new Error('Error en al solicitar datos de los usuarios');
    const pageUser: Page<User> = response.data;
    return pageUser;

  } catch(e) {
    throw e;
  }
}

const getUserById = async(id: number) => {
  try {
    const response = await instance.get(`/users/${id}`);
    if(response?.status !== 200) {
      throw new Error(response.data);
    };
    const user: User = response.data;
    return user;
  } catch(e) {
    throw e;
  }
}

const updateUser = async(id: number, user: User) => {
  try {
    const response = await instance.put(`/users/${id}`, user);
    if(response?.status === 200) {
      const user: User = response.data;
      return user;
    }
  } catch(e) {
    throw e;
  }
}

const deleteUser = async(id: number): Promise<boolean> => {
  try {
    const response = await instance.delete(`/users/${id}`);
    return (response?.status === 204);
  } catch(e) {
    throw e;
  }
}

export {
  getUsers,
  getUsersByName,
  getUserById,
  updateUser,
  deleteUser
}