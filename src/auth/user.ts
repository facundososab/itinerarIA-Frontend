import instance from './axios.js';
import User  from '../interfaces/User.js';



export const registerRequest = (user:User) => {
  return instance.post(`/auth/register`, user);
}
export const loginRequest = async (user:User) => {
  return instance.post(`/auth/login`, user);
}
export const verifyTokenRequest = async () => { 
  return instance.get(`/auth/verify`);
}
export const logoutRequest = async () => {
  return instance.post(`/auth/logout`);
}

export const updateUserRequest = async (user: User) => {
  return instance.put(`/usuarios/${user.id}`, user);
}