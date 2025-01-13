import React, { useState, useEffect } from "react";
import { Box, Container, Pagination } from "@mui/material";
import { TodoStats } from "../todo-stats/TodoStats";
import { TodoTask } from "../../shared/ui/todo/Todo";
import { ButtonAddTask } from "../../shared/ui/button/add-button/ButtonAddTask";
import { MyModal } from "../../shared/ui/modal/MyModal";
import { fetchTodos } from "../../shared/api/api";
import { filteredTasksByDay } from "../helpers/helpers";
import { SelectFilterButton } from "../../shared/ui/button/select-button/SelectFilterButton";

const TodoList = ({ day }) => {
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
            <TodoStats tasks={filteredTasks} day={day} />
            <Box className='box-select-button'>
                <SelectFilterButton onFilterChange={selectFilter} filter={filter} />
            </Box>
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
                className='pagination'
                variant="outlined"
                count={quantityPage}
                page={currentPage}
                onChange={(_, num) => setCurrentPage(num)}
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

export { TodoList };