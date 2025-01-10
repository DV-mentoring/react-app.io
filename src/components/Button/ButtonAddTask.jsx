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
         <Box className='box-button'>
         <IconButton className='button' size ='small' aria-label="add" onClick={handleModalOpen}>
        <AddIcon/>
        </IconButton>
        <Typography className='title-button'>
            Add Task
        </Typography>
    </Box>
    </Container>
   
   
  )
}
