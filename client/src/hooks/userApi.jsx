import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000/"
});

export const useApi = () => ({
  validateToken: async (token) => {
    const response = await api.post('/validate', { token });
    return response.data;
  },  
  signin: async (email, password) => {
    const res = await api.post('/login', { email, password });
    return res.data
  },
  
  register: async (email, password,name) => {
    const res = await api.post('/register', { email, password, name });
    return res.data;
  },
  logout: async () => {
    return { 
      status: true 
    };
  },
  removeUser: async (email) => {
    console.log(email)
    await api.post("/removeUser",{email})
  }
});