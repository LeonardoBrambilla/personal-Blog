import { useContext , useState } from "react";
import { useParams } from 'react-router-dom'
import { TextField,Button,Grid  } from '@mui/material';
import { AuthContext } from "./ContextProvider";

export const RequireAuth = () => {
  const auth = useContext(AuthContext);
  const {IdText} = useParams()
  const [comment,setComment] = useState("")

  const handlePost = async () => {
    if(comment) {
      console.log(auth.user.name)
      await auth.createComment(IdText,auth.user.name,comment)      
    }
    setComment("")
    window.location.href = window.location.href;
  }
  return (
    <Grid item xs={12} display={"flex"} alignItems='flex-end' direction={"column"}> 
      <TextField
        label="Add a commment"
        multiline
        variant="filled"
        color="success"
        value={comment}
        onChange={e => setComment(e.target.value)}
      />
      <span style={{padding:5}}/>
      <Button variant="contained"  color="success" onClick={handlePost}>Public Text</Button>
          
    </Grid>
  )  
}