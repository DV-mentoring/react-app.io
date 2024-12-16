import React from 'react'
import { Box, Container, IconButton,Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



export function ButtonAddTask({ setOpenModal }) {
    const handleModalOpen = () => {
        setOpenModal(true);
        console.log('edit')
    }

    return (

    <Container >
         <Box sx={{display: 'flex', alignItems: 'center', gap: 1, mt: 1}}>
         <IconButton size = 'small' aria-label="add" sx={{bgcolor: '#FF4F5A', mt: 1}} onClick={handleModalOpen}>
        <AddIcon/>
        </IconButton>
        <Typography sx={{fontSize:24, mt: 1}}>
            Add Task
        </Typography>
    </Box>
    </Container>
   
   
  )
}
