import axios from './axios';
import User  from '../interfaces/User.js';



export const registerRequest = (user:User) => {
  return axios.post(`/auth/register`, user);
}
export const loginRequest = async (user:User) => {
  return axios.post(`/auth/login`, user);
}
export const verifyTokenRequest = async () => { 
  return axios.get(`/auth/verify`);
}
export const logoutRequest = async () => {
  return axios.post(`/auth/logout`);
}

export const updateUserRequest = async (user: User) => {
  return axios.put(`/usuarios/${user.id}`, user);
}