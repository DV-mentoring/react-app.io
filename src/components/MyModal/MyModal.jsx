import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import {Button, TextField} from "@mui/material";
export const MyModal = ({openModal, handleModal}) => {

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(name === 'taskName'){
            setTaskName(value);
        } else {
            setDescription(value);
        }
    }

    // Буду делать сохранение задач
    const handleSave = () => {
        if (taskName && description) {
            const newTask = {
                id: Date.now(),
                title: taskName,
                description: description,
                isActive: true,
            }
        }
    };


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <TextField fullWidth label="Название"
                               id="fullWidth" sx={{ pb: 2 }}
                               value={taskName}
                               onChange={handleChange}
                               name="taskName"
                    />

                    <TextField fullWidth label="Описание"
                               id="fullWidth"
                               multiline rows={4}
                               value={description}
                               onChange={handleChange}
                               name="description"
                    />

                    <Box sx={{display: 'flex', justifyContent: 'center', gap: 1, mt: 2}}>
                        <Button variant="outlined" color="error" onClick={handleSave}>Создать</Button>
                        <Button variant="outlined" color="error" onClick={handleModal}>Закрыть</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
};
