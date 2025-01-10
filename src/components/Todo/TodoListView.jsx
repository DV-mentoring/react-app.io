import React, { useState, useEffect } from "react";
import { Box, Container, Pagination } from "@mui/material";
import { TodoList } from "../Main/TodoList";
import { TodoTask } from "./Todo";
import { ButtonAddTask } from "../Button/ButtonAddTask";
import { MyModal } from "../MyModal/MyModal";
import { fetchTodos } from "../../service/Api";
import { filteredTasksByDay } from "../../Helpers/helpers";
import { SelectFilterButton } from "../Button/SelectFilterButton";

const TodoListView = ({ day }) => {
    const [tasks, setTasks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(0);
    const [selectedFilterTasks, setSelectedFilterTasks] = useState([]);
    const [filter, setFilter] = useState("all");
    const [openEditModal, setEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { tasks, totalCount } = await fetchTodos(currentPage);
                setTasks(tasks);
                setSelectedFilterTasks(tasks);
                const totalPages = Math.ceil(totalCount / 10);
                setQuantityPage(totalPages);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [currentPage]);

    const applyFilter = (tasks) => {
        if (filter === "all") {
            setSelectedFilterTasks(tasks);
        } else if (filter === "active") {
            setSelectedFilterTasks(tasks.filter((task) => !task.isActive));
        } else if (filter === "completed") {
            setSelectedFilterTasks(tasks.filter((task) => task.isActive));
        }
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
        applyFilter(updatedTasks);
    };

    const toggleTaskStatus = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, isActive: !task.isActive } : task
        );
        setTasks(updatedTasks);
        applyFilter(updatedTasks);
    };

    const handleModalOpen = (task = { title: "", date: new Date() }) => {
        setCurrentTask(task);
        setEditModal(true);
    };

    const handleModalClose = () => {
        setEditModal(false);
        setCurrentTask(null);
    };

    const addOrUpdateTask = (task) => {
        let updatedTasks;
        if (task.id) {
            updatedTasks = tasks.map((t) => (t.id === task.id ? task : t));
        } else {
            updatedTasks = [...tasks, { ...task, id: Date.now(), isActive: false }];
        }
        setTasks(updatedTasks);
        applyFilter(updatedTasks);
    };

    const selectFilter = (filter) => {
        setFilter(filter);
        applyFilter(tasks);
    };

    const filteredTasks = filteredTasksByDay(selectedFilterTasks, day);

    return (
        <Container>
            <Box sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <SelectFilterButton onFilterChange={selectFilter} filter={filter} />
            </Box>
            <TodoList tasks={filteredTasks} day={day} />
            {filteredTasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                    deleteTask={deleteTask}
                    handleEditModalOpen={() => handleModalOpen(task)}
                />
            ))}
            <ButtonAddTask setOpenModal={() => handleModalOpen()} />
            <Pagination
                variant="outlined"
                count={quantityPage}
                page={currentPage}
                onChange={(_, num) => setCurrentPage(num)}
                sx={{ display: "flex", justifyContent: "center", mt: 2, paddingRight: "5%" }}
            />
            <MyModal
                openModal={openEditModal}
                handleModalClose={handleModalClose}
                initalTask={currentTask || {}}
                onSubmit={addOrUpdateTask}
            />
        </Container>
    );
};

export { TodoListView };