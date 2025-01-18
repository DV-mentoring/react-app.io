import React, { useState, useMemo } from "react";
import { Box, Container, Pagination } from "@mui/material";
import { TodoStats } from "../todo-stats/TodoStats";
import { TodoTask } from "../../shared/ui/todo/Todo";
import { ButtonAddTask } from "../../shared/ui/button/add-button/ButtonAddTask";
import { MyModal } from "../../shared/ui/modal/MyModal";
import { SelectFilterButton } from "../../shared/ui/button/select-button/SelectFilterButton";
import { useDispatch, useSelector } from "react-redux";
import {filteredTasksByDay} from "../helpers/helpers";
import {
    addTask,
    editTask,
    filterTask,
    removeTask,
    selectFilteredTasks,
    selectFilterTask,
    toggleTask
} from "../../app/store/tasks";

const TodoList = ({ day }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectFilteredTasks);
    const filter = useSelector(selectFilterTask);

    const [currentPage, setCurrentPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(0);
    const [openEditModal, setEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    const filteredTasks =  filteredTasksByDay(tasks, day);

    const deleteTask = (id) => {
        dispatch(removeTask(id));
    };

    const toggleTaskStatus = (id) => {
        dispatch(toggleTask(id));
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
        if (task.id) {
            dispatch(editTask(task));
        } else {
            dispatch(addTask(task));
        }
    };

    const filterTasks = (filter) => {
        dispatch(filterTask(filter));
    };

    return (
        <Container>
            <TodoStats tasks={filteredTasks} day={day} />
            <Box className="box-select-button">
                <SelectFilterButton onFilterChange={filterTasks} filter={filter} />
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
                className="pagination"
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