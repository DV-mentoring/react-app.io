import React, { useState, useEffect} from "react";
import {Container, Pagination} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";
import {ButtonAddTask} from "../Button/ButtonAddTask";
import { MyModal} from "../MyModal/MyModal";

const TodoListView = ({day}) => {
    const [tasks, setTasks] = useState([]);
    const [page,setPage] = useState(1);
    const [pageQty, setPageQty] = useState(0);

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/todos?_page=${page}&_limit=10`)
            .then((response) => {
                const totalCount = response.headers.get("X-Total-Count");
                return response.json().then((data) => ({ data, totalCount }));
            })
            .then(({ data, totalCount }) => {
                const formattedTasks = data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    date: new Date(),
                    isActive: !task.completed,
                }));
                setTasks(formattedTasks);
                const totalPages = Math.ceil(totalCount / 10);
                setPageQty(totalPages);
            })
            .catch((error) => console.log(error));
    }, [page]);


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

    const handleModalOpen = (task = {title: '', date: new Date()}) => {
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

    const getFilteredTasks = (tasks, day) => {
        const today = new Date();
        return tasks.filter((task) => {
            const taskDate = new Date(task.date);
            if(day === "Yesterday") {
                const yesterday = new Date(today);
                yesterday.setDate(today.getDate() - 1);
                return taskDate.toDateString() === yesterday.toDateString();
            }
            if(day === "Upcoming") {
                return taskDate > today;
            }
            return taskDate.toDateString() === today.toDateString();
        })
    }

    const filteredTasks = getFilteredTasks(tasks,day)

    return (
        <Container>
            <TodoList tasks={filteredTasks} day={day}/>
            {filteredTasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                    deleteTask={deleteTask}
                    handleEditModalOpen={() => handleModalOpen(task)}
                />
            ))}
            <ButtonAddTask setOpenModal={() => handleModalOpen()}/>
            <Pagination
                variant="outlined"
                count={pageQty}
                page={page}
                onChange={(_, num) => setPage(num)}
                sx={{display: 'flex', justifyContent: "center", mt: 2, paddingRight: "5%"}}
            />
            <MyModal openModal={openEditModal}
                     handleModalClose={handleModalClose}
                     initalTask={currentTask || {}}
                     onSubmit={addOrUpdateTask} />

        </Container>
    );

};

export {TodoListView};