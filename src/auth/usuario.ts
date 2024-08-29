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