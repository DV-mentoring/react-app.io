import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import { Button, TextField } from '@mui/material'

interface IMyModalProps {
    openModal: boolean
    handleModalClose: () => void
    onSubmit: (
        task: { title: string; description?: string } | undefined,
    ) => void
    initalTask?: any
}

export const MyModal: FC<IMyModalProps> = ({
    openModal,
    handleModalClose,
    onSubmit,
    initalTask,
}) => {
    const [taskName, setTaskName] = useState(initalTask?.title || '')
    const [description, setDescription] = useState(
        initalTask?.description || '',
    )
    const [error, setError] = useState(false)

    useEffect(() => {
        setTaskName(initalTask?.title || '')
        setDescription(initalTask?.description || '')
    }, [initalTask])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target

        if (name === 'taskName') {
            setTaskName(value)
        } else {
            setDescription(value)
        }
    }

    const handleSaveTask = () => {
        if (!taskName.trim()) {
            setError(true)
            return
        }
        setError(false)
        onSubmit({ ...initalTask, title: taskName, description })
        handleModalClose()
    }

    const isEditMode = Boolean(initalTask?.id)

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="modal-window">
                    <TextField
                        className="text-field-modal"
                        fullWidth
                        label="Название"
                        id="fullWidth"
                        value={taskName}
                        onChange={handleChange}
                        error={error}
                        helperText={
                            error
                                ? 'Название задачи не может быть пустым, напиши что-то'
                                : ''
                        }
                        name="taskName"
                    />

                    <TextField
                        fullWidth
                        label="Описание"
                        id="fullWidth"
                        multiline
                        rows={4}
                        value={description}
                        onChange={handleChange}
                        name="description"
                    />

                    <Box className="box-modal">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleSaveTask}
                        >
                            {isEditMode ? 'Редактировать' : 'Создать'}
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={handleModalClose}
                        >
                            Закрыть
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
