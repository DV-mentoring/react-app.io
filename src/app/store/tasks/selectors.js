import { createSelector } from '@reduxjs/toolkit';

export const selectTasksState = (state) => state.tasks || {};

export const selectTasks = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.tasks || []
);

export const selectFilterTask = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.filter || 'all'
);

export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilterTask],
    (tasks, filter) => {
        switch (filter) {
            case 'active':
                return tasks.filter((task) => task.isActive);
            case 'completed':
                return tasks.filter((task) => !task.isActive);
            default:
                return tasks;
        }
    }
);