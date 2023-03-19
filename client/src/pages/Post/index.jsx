import React,{useContext,useEffect,useState} from 'react'
import { Grid } from '@material-ui/core';
import { AuthContext } from "../../context/Auth/ContextProvider"
import { useParams } from 'react-router-dom'
import Comment from '../../components/comments';
import OneText from '../../components/onetext'
import { RequireAuth } from '../../context/Auth/RequireAuth';


const Post = () => {
  const {IdText} = useParams()
  const text = useContext(AuthContext)
  const [comment,setComment] = useState()
  const [oneText,setOneText] = useState()
  
  useEffect(() => {
    const get = async () => {
      const data = await text.getText(IdText)
      setComment(data.comment)
      setOneText(data.text)
    }
    get()
  }, [])    

  return (
    <Grid container alignItems='center' spacing={1} direction={"column"}>
      
      {oneText && <OneText key={oneText._id} text={oneText?.text} like={oneText.likes} title={oneText.title} comments={oneText.comment} id={oneText._id} date={oneText.date}/>}
      <RequireAuth />
      {comment?.map(e=><Comment key={e._id} comment={e.comment} name={e.name} date={e.date}/>)}
    </Grid>
  )
}

export default Post