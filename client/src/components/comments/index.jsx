import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@material-ui/core';

const Comment = ({comment,name,date}) => { 
  return (
    <Grid item xs={12} >
    <Card sx={{ width:700, maxWidth:680, border: "1px solid black",borderColor: '#000000', backgroundColor: "#D9D9D9", borderRadius: 2.5, padding: 0, margin:2 }}>
      <CardContent>
          <Typography variant="body1" sx={{ fontSize: 20, display:"flex", alignItems:"center"}} color="text.first">
            {name} 
          </Typography> 
          <Typography sx={{ fontSize: 14, display: '-webkit-box', overflow: 'hidden', WebkitBoxOrient: 'vertical', WebkitLineClamp: 6}} color="text.secondary">
            {comment} 
          </Typography>
        {date}
      </CardContent>
    </Card>
    </Grid>
  )
}

export default Comment