import React, { useState} from "react";
import { Container} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";
import {ButtonAddTask} from "../Button/ButtonAddTask";
import {EditMyModal, MyModal} from "../MyModal/MyModal";

const TodoListView = ({day}) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description of task 1", isActive: true },
        { id: 2, title: "Task 2", description: "Description of task 2", isActive: false },
        { id: 3, title: "Task 3", description: "Description of task 3", isActive: true },
        { id: 4, title: "Task 1", description: "Description of task 1", isActive: true },

    ]);
    const [openModal, setOpenModal] = useState(false);
    const [openEditModal, setEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({})
    const handleModalClose = () => setOpenModal(!openModal);

    const addTask = (title,description) => {
        const todoTask = {
            id: Date.now(),
            title,
            description,
            isActive: false,
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

    const handleEditModalOpen = (task) => {
        setCurrentTask(task);
        setEditModal(true);
    }

    const handleEditModalClose = () => {
        setEditModal(false);
        setCurrentTask(null)
    }

    const updateTask = (updatedTask) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === updatedTask.id ? updatedTask : task
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
                    handleEditModalOpen={() => handleEditModalOpen(task)}
                />
            ))}
            <MyModal addTask={addTask} openModal={openModal} handleModalClose={handleModalClose} />
            <ButtonAddTask setOpenModal={setOpenModal} />
            {currentTask && (
                <EditMyModal
                    openModal={openEditModal}
                    handleModalClose={handleEditModalClose}
                    task={currentTask}
                    updateTask={updateTask}/>
            )}
        </Container>
    );
};

export {TodoListView};