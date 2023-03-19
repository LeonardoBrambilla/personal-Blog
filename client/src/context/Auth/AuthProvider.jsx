import { useEffect, useState } from "react";
import { AuthContext } from "./ContextProvider";
import { useApi } from "../../hooks/userApi";
import { textApi } from "../../hooks/textApi";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [text, setText] = useState([])
  const [comment,setComment] = useState([])
  const UserApi = useApi();
  const TextApi = textApi()

  useEffect(() => {
    const validateToken = async () => {
      const storageData = localStorage.getItem('authToken');
      if (storageData) {
        const data = await UserApi.validateToken(storageData);
        if (data.user) {
          setUser(data.user);
        }
      }
    }

    const getAllText = async () => {
      const data = await TextApi.getAllText()
      setText(data.text)
      setComment(data.comment)
    }
    
    validateToken();
    getAllText()
  }, []);

  const signin = async (email, password) => {
    const data = await UserApi.signin(email, password);
    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
        return true;
    }
    return false;
  }

  const register = async (email, password, name) => {
    const data = await UserApi.register(email, password, name)  
    if (data.user && data.token) {
      setUser(data.user);
      setToken(data.token);
      return true;
    }
    return false;
  }
    
  const signout = async () => {
    setUser(null);
    setToken('');
    await UserApi.logout();
  }

  const setToken = (token) => {
    localStorage.setItem('authToken', token)
  }

  const createText = async (title,text) => {
    await TextApi.createText(title,text)
  }

  const deleteMessage = async (id) => {
    await TextApi.deleteMessage(id)
  }

  const removeUser = async (email) => {
    await UserApi.removeUser(email)
  }   

  const getText = async (IdText,name) => {
    const data = await TextApi.getText(IdText,name)
    return data
  }
    
  const giveLike = async (id,name) => {
    await TextApi.giveLike(id,name)
  }

  const removeLike = async (id,name) => {
    await TextApi.removeLike(id,name)
  }

  const createComment = async (IdText,name,comment) =>  {
    await TextApi.createComment(IdText,name,comment)
  }
    
  return (
    <AuthContext.Provider value={{ user, text, comment, removeUser, getText, deleteMessage, signin, signout, register, createText, giveLike, removeLike, createComment }}>
      {children}
    </AuthContext.Provider>
  );
}