import {createSelector} from "@reduxjs/toolkit";

export const selectTasks = (state) => state.tasks.tasks;
export const selectFilter = (state) => state.tasks.filter;

export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilter],
    (tasks, filter) => {
        switch (filter) {
            case "active":
                return tasks.filter((task) => !task.isActive);
            case "completed":
                return tasks.filter((task) => task.isActive);
            default:
                return tasks;
        }
    }
);