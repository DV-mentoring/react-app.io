import React, { useState, useEffect} from "react";
import { Container} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";
import {ButtonAddTask} from "../Button/ButtonAddTask";
import { MyModal} from "../MyModal/MyModal";

const TodoListView = ({day}) => {
    const [tasks, setTasks] = useState([

    ]);
    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/todos")
            .then((response) => response.json())
            .then((data) => {
                const formattedTasks = data.slice(0, 10).map((task) => ({
                    id: task.id,
                    title: task.title,
                    isActive: !task.completed,
                }));
                setTasks(formattedTasks);
            })
            .catch((error) => console.log(error));
    }, []);

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