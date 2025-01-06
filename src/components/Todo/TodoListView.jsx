import React, { useState, useEffect} from "react";
import {Container, Pagination} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";
import {ButtonAddTask} from "../Button/ButtonAddTask";
import { MyModal} from "../MyModal/MyModal";
import {fetchTodos} from "../../service/Api";
import {filteredTasksByDay} from "../../Helpers/helpers";

const TodoListView = ({day}) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage,setCurrentPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {tasks, totalCount} = await fetchTodos(currentPage);
                setTasks(tasks);
                const totalPages = Math.ceil(totalCount / 10)
                setQuantityPage(totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [currentPage]);


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

    const filteredTasks = filteredTasksByDay(tasks,day)

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
                count={quantityPage}
                page={currentPage}
                onChange={(_, num) => setCurrentPage(num)}
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