import React from 'react'
import { Outlet,Link } from 'react-router-dom'
import { useContext } from 'react';
import { AuthContext } from '../../context/Auth/ContextProvider';
import Button from '@mui/material/Button';
import { AppBar } from '@mui/material';

const Header = () => {
  const user = useContext(AuthContext)
  const signout = async () => {
    await user.signout();
    window.location.href = window.location.href;
  }

  return (
    <div style={{display:'flex',flexDirection:"column"}}>
      <AppBar position='fixed' sx={{flexDirection:"row", width:"100%",height:80,color:"#FFFFFF",backgroundColor:"#052705",display:"flex",alignItems:"center",justifyContent:"space-between",position:"fixed"}}>
        <Button variant='text' color="inherit">
          <Link style={{padding:10,color:"white",textDecoration:"none",fontSize:25}} to="/">Blog</Link>
        </Button>
        <div>
          <Button color="inherit">
            <Link style={{padding:10,color:"white",textDecoration:"none",fontSize:15}} to="/">About</Link>
          </Button>
          {user.user?.role === 'admin' &&
            <Button color="inherit">
              <Link style={{padding:10,color:"white",textDecoration:"none",fontSize:15}} to="/post">Post</Link>
            </Button>
          }
          {!user.user &&
            <Button color="inherit">
              <Link style={{padding:10,color:"white",textDecoration:"none",fontSize:15}} to="/auth">Login</Link>
            </Button>
          }
          {
            user.user &&
            <Button onClick={signout} variant="text" color="error">Signout</Button>
          }
        </div>
      </AppBar>
      <span style={{padding:60}}/>
      <Outlet />
    </div>
  )
}

export default Header