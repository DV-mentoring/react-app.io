import React, {useEffect, useState} from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {Button, TextField} from "@mui/material";



export const MyModal = ({openModal, handleModalClose, onSubmit, initalTask}) => {

    const [taskName, setTaskName] = useState(initalTask?.title || '');
    const [description, setDescription] = useState(initalTask?.description || '');
    const [error, setError] = useState(false);

    useEffect(() => {
        setTaskName(initalTask?.title || '');
        setDescription(initalTask?.description || '');
    }, [initalTask]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'taskName') {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    const handleSaveTask = () => {
        if (!taskName.trim()) {
            setError(true);
            return;
        }
        setError(false);
        onSubmit({ ...initalTask, title: taskName, description });
        handleModalClose();
    };

    const isEditMode = Boolean(initalTask?.id);



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
                               error={error}
                               helperText={error ? "Название задачи не может быть пустым, напиши что-то" : ""}
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
                        <Button variant="outlined" color="error" onClick={handleSaveTask}>
                            {isEditMode ? "Редактировать" : "Создать"}
                        </Button>
                        <Button variant="outlined" color="error" onClick={handleModalClose}>Закрыть</Button>
                    </Box>

                </Box>
            </Modal>
        </div>
    );
};
