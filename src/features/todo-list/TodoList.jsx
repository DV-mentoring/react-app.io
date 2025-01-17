import React, { useState, useMemo } from "react";
import { Box, Container, Pagination } from "@mui/material";
import { TodoStats } from "../todo-stats/TodoStats";
import { TodoTask } from "../../shared/ui/todo/Todo";
import { ButtonAddTask } from "../../shared/ui/button/add-button/ButtonAddTask";
import { MyModal } from "../../shared/ui/modal/MyModal";
import { SelectFilterButton } from "../../shared/ui/button/select-button/SelectFilterButton";
import { useDispatch, useSelector } from "react-redux";
import { selectFilteredTasks } from "../../app/store/tasks.selector";
import {filteredTasksByDay} from "../helpers/helpers";

const TodoList = ({ day }) => {
    const dispatch = useDispatch();
    const tasks = useSelector(selectFilteredTasks);
    const filter = useSelector((state) => state.tasks.filter);

    const [currentPage, setCurrentPage] = useState(1);
    const [quantityPage, setQuantityPage] = useState(0);
    const [openEditModal, setEditModal] = useState(false);
    const [currentTask, setCurrentTask] = useState({});

    const filteredTasks = useMemo(() => filteredTasksByDay(tasks, day), [tasks, day]);

    const deleteTask = (id) => {
        dispatch({ type: "REMOVE_TASK", payload: { id } });
    };

    const toggleTaskStatus = (id) => {
        dispatch({ type: "TOGGLE_TASK", payload: { id } });
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
            dispatch({ type: "EDIT_TASK", payload: task });
        } else {
            dispatch({
                type: "ADD_TASK",
                payload: {
                    id: Date.now(),
                    title: task.title,
                    description: task.description,
                    isActive: false,
                    date: new Date().toISOString(),
                },
            });
        }
    };

    const selectFilter = (filter) => {
        dispatch({ type: "FILTER_TASK", payload: { filter } });
    };

    return (
        <Container>
            <TodoStats tasks={filteredTasks} day={day} />
            <Box className="box-select-button">
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