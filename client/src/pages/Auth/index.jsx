import React,{useState,useContext} from 'react'
import { AuthContext } from '../../context/Auth/ContextProvider'
import { useNavigate } from 'react-router-dom'
import { TextField,Card,Button,Stack  } from '@mui/material';


const Auth = ({children}) => {
  const auth = useContext(AuthContext)
  const [state, setstate] = useState(true)
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      await auth.signin(email, password);
      navigate('/');
    }
  }

  const hendleRegister = async () => {
    if (email && password) {
      if(password === confirmPassword) {
        await auth.register(email, password,name);
        navigate('/');
      }
    }
 }

  if(!auth.user){
  return (
    <Stack direction="column" spacing={1} alignItems={'center'} >      
      {state &&
        <Card sx={{display: 'flex',alignItems:'center',flexDirection:'column',padding:4,margin:8,border: "1px solid black",backgroundColor: "#D9D9D9"}}>
          Login
          <TextField
            variant="outlined"
            required
            label="Email"
            value={email}
            type="email"
            onChange={e=>setEmail(e.target.value)}
          />
          <span style={{padding:10}}/>
          <TextField
            variant="outlined"
            required
            label="Password"
            value={password}
            type="password"
            onChange={e=>setPassword(e.target.value)}
          />
          <span style={{padding:10}}/>
          <Stack direction="row" spacing={1} alignItems={'center'}>
            You dont have a account?<Button onClick={() => setstate(!state)}>Register</Button>
            <Button variant="contained" color="success" onClick={handleLogin}>Logar</Button>
          </Stack >
        </Card>
      }
      {!state &&
        <Card sx={{display: 'flex',alignItems:'center',flexDirection:'column',padding:4,margin:8,border: "1px solid black",backgroundColor: "#D9D9D9"}}>
          Register
          <TextField
            variant="outlined"
            required
            label="Email"
            value={email}
            type="email"
            onChange={e=>setEmail(e.target.value)}
          />
          <span style={{padding:5}}/>
          <TextField
            variant="outlined"
            required
            label="Name"
            value={name}
            type="name"
            onChange={e=>setName(e.target.value)}
          />
          <span style={{padding:5}}/>
          <TextField
            variant="outlined"
            required
            label="Password"
            value={password}
            type="password"
            onChange={e=>setPassword(e.target.value)}
          />
          <span style={{padding:5}}/>
          <TextField
            variant="outlined"
            required
            label="ConfirmPassword"
            value={confirmPassword}
            type="password"
            onChange={e=>setConfirmPassword(e.target.value)}
          />
          <Stack direction="row" spacing={1} alignItems={'center'}>
            You have a account?<Button onClick={() => setstate(!state)}>Login</Button>
            <Button variant="contained" color="success" onClick={hendleRegister}>Register</Button>
          </Stack>
        </Card>
      }
    </Stack>
  )}
  return children
}

export default Auth