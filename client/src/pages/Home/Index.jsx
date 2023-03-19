import React,{useContext} from 'react'
import { Grid, Typography } from '@material-ui/core';
import { AuthContext } from "../../context/Auth/ContextProvider"
import Text from '../../components/text'

const Home = () => {
  const text = useContext(AuthContext)
  return (
    <Grid container alignItems='center' direction={"column"} > 
      <Typography variant="h3"> All Post</Typography>
      {text?.text.map(e=><Text key={e._id} text={e.text} like={e.likes} title={e.title} comments={e.comment} id={e._id} date={e.date}/>)}
      
    </Grid>
  )
}

export default Home