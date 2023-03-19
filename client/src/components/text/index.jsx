import React,{useState,useContext} from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {AuthContext} from '../../context/Auth/ContextProvider'
import { Grid } from '@material-ui/core';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
 
const Text = ({text,like,title,comments,id,date}) => {
  const user = useContext(AuthContext)
  
  function handlelikes() {
    const bool = user.user?.likes.some(e=>(e === id))
    if(bool) {
      return false
    } else return true 
  }

  const [expanded, setExpanded] = useState(false);
  const [likes,setLikes] = useState(like)
  const [toggleLike,setToggleLike] = useState(handlelikes)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

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
    <Grid item xs={6} sx={{width:600}}>  
    <Card sx={{  maxHeight: expanded ? 900 : 400 , border: "1px solid black",borderColor: '#000000', backgroundColor: "#D9D9D9", borderRadius: 2.5, padding: 0, margin:2 }}>
      <CardContent>
        <ListItemButton sx={{display:"flex", flexDirection:"column", alignItems:"center"}} href={`text/${id}`}>
          <Typography variant="body1" sx={{ fontSize: 20 }} color="text.first">
            {title} 
          </Typography>
          <Typography sx={{ fontSize: 14, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 6}} color="text.secondary">
            {text} 
          </Typography>
        </ListItemButton> 
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
        <IconButton href={`/text/${id}`}>
          <ModeCommentOutlinedIcon/>{comments}
        </IconButton>
          {date}
        <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
        >
            <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <ListItemButton sx={{display:"flex", flexDirection:"column", alignItems:"center"}} href={`/text/${id}`}>
            <Typography paragraph>
              {text}
            </Typography>
          </ListItemButton>      
        </Collapse>
      </CardContent>
    </Card>
    </Grid>
  )
}

export default Text