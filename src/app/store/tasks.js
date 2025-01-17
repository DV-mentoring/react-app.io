import {createSelector} from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    filter: "all",

};
// Редьюсеры
export const tasks = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: action.payload.id || Date.now(),
                        title: action.payload.title,
                        description: action.payload.description || '',
                        isActive: false,
                        date: action.payload.date || new Date().toISOString(),
                    },
                ],
            };

        case "TOGGLE_TASK": {
            return {
                ...state,
                tasks: state.tasks.map((task) => task.id === action.payload.id ? { ...task, isActive: !task.isActive } : task),
            }
        }

        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload.id),
            }
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? {...task, ...action.payload} : task
                ),
            }

        case "FILTER_TASK":
            return {
                ...state,
                filter: action.payload.filter,
            };
        default:
            return state;
    }
};


// Экшены
export const addTask = (task) => ({
        type: "ADD_TASK",
        payload: {
            id: Date.now(),
            title: task.title,
            description: task.description,
            isActive: false,
            date: new Date().toISOString(),
        },
});

export const removeTask = (id) => ({
    type: "REMOVE_TASK",
    payload: {id},
});

export const editTask = (task) => ({
    type: "EDIT_TASK",
    payload: task,
});

export const toggleTask = (id) => ({
    type: "TOGGLE_TASK",
    payload: {id},
})

export const filterTask = (filter) => ({
    type: "FILTER_TASK",
    payload: {filter},
})

// Селекторы

export const selectTasks = (state) => state.tasks.tasks;
export const selectFilterTask = (state) => state.tasks.filter;


export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilterTask],
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