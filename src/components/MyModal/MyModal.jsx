import React, {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";



export const MyModal = ({addTask, openModal, handleModalClose}) => {

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'taskName') {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    const handleCreateTask = () => {
        if (taskName && description) {
            addTask(taskName, description);
            setTaskName('');
            setDescription('');
            handleModalClose();
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
                onClose={handleModalClose}
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
                        <Button variant="outlined" color="error" onClick={handleCreateTask}>Создать</Button>
                        <Button variant="outlined" color="error" onClick={handleModalClose}>Закрыть</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
};

export const EditMyModal = ({openModal, handleModalClose, task, updateTask}) => {

    const [taskName, setTaskName] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    useEffect(() => {
        if(task) {
            setTaskName(task.title);
            setDescription(task.description);
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'taskName') {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    const handleSaveTask = () => {
        if (taskName && description) {
            updateTask({ ...task, title: taskName, description });
            handleModalClose();
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
                onClose={handleModalClose}
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
                        <Button variant="outlined" color="error" onClick={handleSaveTask}>Редактировать</Button>
                        <Button variant="outlined" color="error" onClick={handleModalClose}>Закрыть</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
};