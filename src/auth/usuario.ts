import axios from 'axios';
import User  from '../interfaces/User.js';
const API = 'http://localhost:3000/api/auth';


export const registerRequest = (user:User) => {
  return axios.post(`${API}/register`, user);
}
export const loginRequest = async (user:User) => {
  return axios.post(`${API}/login`, user);
}
export const verifyTokenRequest = async () => { 
  return axios.post(`${API}/verify`, {}, { withCredentials: true });
}