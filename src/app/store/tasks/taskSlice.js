import {fetchTasks} from "../../../shared/api/api";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    totalCount: 0,
    isLoading: false,
    error: '',
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
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