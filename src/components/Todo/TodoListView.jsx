import React, { useState} from "react";
import { Container} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";
import {ButtonAddTask} from "../Button/ButtonAddTask";
import { MyModal} from "../MyModal/MyModal";

const TodoListView = ({day}) => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description of task 1", isActive: true },
        { id: 2, title: "Task 2", description: "Description of task 2", isActive: false },
        { id: 3, title: "Task 3", description: "Description of task 3", isActive: true },
        { id: 4, title: "Task 1", description: "Description of task 1", isActive: true },

    ]);
    const [openEditModal, setEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({})


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

    const handleModalOpen = (task = null) => {
        setCurrentTask(task);
        setEditModal(true);
    }

    const handleModalClose = () => {
        setEditModal(false);
        setCurrentTask(null)
    }

    const addOrUpdateTask = (task) => {
        if (task.id) {
            setTasks((prevTasks) =>
                prevTasks.map((t) => (t.id === task.id ? task : t))
            );
        } else {
            setTasks((prevTasks) => [
                ...prevTasks,
                { ...task, id: Date.now(), isActive: false },
            ]);
        }
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
                    handleEditModalOpen={() => handleModalOpen(task)}
                />
            ))}
            <ButtonAddTask setOpenModal={() => handleModalOpen()}/>
            <MyModal openModal={openEditModal}
                     handleModalClose={handleModalClose}
                     initalTask={currentTask || {}}
                     onSubmit={addOrUpdateTask} />

        </Container>
    );
};

export {TodoListView};