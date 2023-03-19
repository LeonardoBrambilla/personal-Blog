import React, { useState,useContext } from 'react';
import { TextField,Button  } from '@mui/material';
import {AuthContext} from './ContextProvider'

const RequireAdmin = ({ children }) => {
  const auth = useContext(AuthContext);
  const [title,setTitle] = useState('')
  const [text, setText] = useState('');

  if (auth.user?.role === 'admin') {
    const handlePost = async () => {
      if(title && text) {
        await auth.createText(title,text)
     
        setText('')
        setTitle('')
      }
    }
    return (
      <div style={{display:'flex',flexDirection:'column',padding:20,alignItems:'flex-start'}}>
        <TextField
          label="Digite o titulo aqui"
          variant="filled"
          minRows={4}
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <span style={{padding:5}}/>
        <TextField
          label="Digite o texto aqui"
          multiline
          fullWidth
          variant="outlined"
          minRows={4}
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <span style={{padding:5}}/>
        <Button variant="contained" color="success" onClick={handlePost}>Public Text</Button>        
      </div>
    );
  }
  return children;
}

export default RequireAdmin