import React, { Fragment } from 'react'
import { Box, Container, IconButton,Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
export default function ButtonAddTask() {
  return (
    <Container >
         <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
         <IconButton size = 'small' aria-label="add" sx={{bgcolor: '#FF4F5A', mt: 1}}>
        <AddIcon /> 
        </IconButton>
        <Typography sx={{fontSize:24, fontFamily: 'Roboto', mt: 1}}>
            Add Task
        </Typography>
    </Box>
    </Container>
   
   
  )
}