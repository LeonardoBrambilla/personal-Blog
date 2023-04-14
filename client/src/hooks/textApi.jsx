import axios from 'axios';

const api = axios.create({
  baseURL: "https://personal-blog-server-ten.vercel.app/"
});

export const textApi = () => ({
  createText: async (title,text) => {
    await api.post('/createText', {title, text });
  },
  createComment: async (IdText,name,comment) => {
    await api.post(`/createComment/${IdText}`,{name,comment})
  },
  getAllText: async () => {
    const response = await api.get('/getAllText');
    return response.data;
  },  
  getText: async (IdText) => {
    const response = await api.get(`/getText/${IdText}`);
    return response.data;
  },  
  deleteMessage: async (id) => {
    await api.post('/deleteMessage',{id});
  },
  giveLike: async (id,name) => {
    await api.patch(`/giveLike/${id}`,{name})
  },
  removeLike: async(id,name)=>{
    await api.patch(`/removeLike/${id}`,{name})
  } 
});