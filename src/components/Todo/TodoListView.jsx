import React, {useEffect, useState} from "react";
import {Button, Container, TextField} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {ButtonAddTask} from "../Button/ButtonAddTask";

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

export const EditMyModal = ({openModal, handleModalClose, saveTask,setOpenModal }) => {

    const [taskName, setTaskName] = useState('');
    const [description, setDescription] = useState('');
    const [editTask, setEditTask] = useState('');

    const handleEditModalOpen = (task) => {
        setEditTask(task);
        setOpenModal(true);
        console.log('edit')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'taskName') {
            setTaskName(value);
        } else {
            setDescription(value);
        }
    };

    useEffect(() => {
        if(editTask)
        setTaskName(editTask.title)
        setDescription(editTask.description)
    }, [editTask]);

    const handleSaveTask = () => {
        if(taskName && description) {
            saveTask({ ...editTask, title: taskName, description });
        }
    }

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

const TodoListView = ({day,editTask}) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description of task 1", isActive: true },
        { id: 2, title: "Task 2", description: "Description of task 2", isActive: false },
        { id: 3, title: "Task 3", description: "Description of task 3", isActive: true },
        { id: 4, title: "Task 1", description: "Description of task 1", isActive: true },

    ]);
    const [openModal, setOpenModal] = useState(false);
    const handleModalClose = () => setOpenModal(!openModal);

    const saveTask = (updatedTask) => {
        setTasks((prevTasks) =>
            prevTasks.map((task) => task.id === updatedTask.id ? updatedTask : task)
        )
    }

    const addTask = (title,description) => {
        const todoTask = {
            id: Date.now(),
            title,
            description,
            isActive: true,
        }
        setTasks((prevTasks) => [...prevTasks, todoTask]);
    }

    const deleteTask = (id) => {
        setTasks([...tasks.filter((task) => task.id !== id)])
    }



    const toggleTaskStatus = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isActive: !task.isActive }  : task
            )
        );
    };

    return (
        <Container>
            <TodoList tasks={tasks} day={day}/>
            {tasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                    deleteTask={deleteTask}
                    handleEditModalOpen={() => handleModalClose(task)}
                />
            ))}
            <MyModal addTask={addTask} openModal={openModal} handleModalClose={handleModalClose} />
            <ButtonAddTask setOpenModal={setOpenModal} />
            <EditMyModal openModal={openModal} handleModalClose={handleModalClose} saveTask={saveTask} editTask={editTask}/>
        </Container>
    );
};

export {TodoListView};