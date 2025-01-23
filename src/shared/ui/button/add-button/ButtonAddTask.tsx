import React from 'react'
import { Box, Container, IconButton, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

interface IButtonAddTaskProps {
    setOpenModal: (open: boolean) => void
}

export function ButtonAddTask({ setOpenModal }: IButtonAddTaskProps) {
    const handleModalOpen = () => {
        setOpenModal(true)
        console.log('adding task')
    }

    return (
        <Container>
            <Box className="box-button">
                <IconButton
                    className="button"
                    size="small"
                    aria-label="add"
                    onClick={handleModalOpen}
                >
                    <AddIcon />
                </IconButton>
                <Typography className="title-button">Add Task</Typography>
            </Box>
        </Container>
    )
}
