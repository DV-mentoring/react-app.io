import { createSlice } from '@reduxjs/toolkit';
import {fetchTasks} from "../../../shared/api/api";


export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        totalCount: 0,
        isLoading: false,
        error: '',
        filter: 'all',
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload);
        },
        removeTask: (state, action) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        toggleTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload ? { ...task, isActive: !task.isActive } : task
            );
        },
        editTask: (state, action) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id ? { ...task, ...action.payload } : task
            );
        },
        filterTask: (state, action) => {
            state.filter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true;
                state.error = '';
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.tasks = action.payload.tasks;
                state.totalCount = action.payload.totalCount;
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const taskReducer = tasksSlice.reducer;
export const { addTask, removeTask, toggleTask, editTask, filterTask } = tasksSlice.actions;