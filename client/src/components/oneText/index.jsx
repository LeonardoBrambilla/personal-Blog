import React,{useState,useContext} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import {AuthContext} from '../../context/Auth/ContextProvider'
import { Grid } from '@material-ui/core';

const OneText = ({text,like,title,id,date}) => {
  const user = useContext(AuthContext)
  
  function handlelikes() {
    const bool = user.user?.likes.some(e=>(e === id))
    if(bool) {
      return false
    } else return true 
  }

  const [likes,setLikes] = useState(like)
  const [toggleLike,setToggleLike] = useState(handlelikes)

  const handleGiveLike = async () => {
    if(user.user) {
      await user.giveLike(id,user.user.name)
      setLikes((likes)=>likes+1)
      setToggleLike(false)
    }
  }

  const handleRemoveLike = async () => {
    if(user.user) {
      setLikes((likes)=>likes-1)
      await user.removeLike(id,user.user.name)
      setToggleLike(true)
    }
  }
 
  return (
    <Grid item xs={12} >
    <Card sx={{ border: "1px solid black",borderColor: '#000000', backgroundColor: "#D9D9D9", borderRadius: 2.5,padding:4,margin:2}}>
      <Typography variant="body1" sx={{ fontSize: 20 }} color="text.first">
        {title}
      </Typography>
      <Typography sx={{ fontSize: 14}} color="text.secondary">
        {text} 
      </Typography>
      <CardActions disableSpacing>
      {
        toggleLike &&
        <IconButton onClick={handleGiveLike} >
          <FavoriteBorderIcon />{likes}
        </IconButton>
      }
      {
        !toggleLike &&
        <IconButton onClick={handleRemoveLike} >
          <FavoriteIcon />{likes}
        </IconButton>
      } 
        {date}
      </CardActions>
    </Card>
    </Grid>
  )
}

export default OneText