import axios from 'axios';
import { User } from '../interfaces/User.js';
const API = 'http://localhost:3000/api/usuarios';


export const registerRequest = (user:User) => {
  return axios.post(`${API}/register`, user);
}