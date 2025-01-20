import {createAsyncThunk} from "@reduxjs/toolkit";
import {BASE_URL} from "../../features/helpers/constants";

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async ({ currentPage, limit }, thunkAPI) => {
        try {
            const response = await fetch(`${BASE_URL}/todos?_page=${currentPage}&_limit=${limit}`);
            if (!response.ok) {
                throw new Error('Error fetching tasks');
            }
            const totalCount = response.headers.get('X-Total-Count');
            const data = await response.json();
            return {
                tasks: data.map((task) => ({
                    id: task.id,
                    title: task.title,
                    date: new Date(),
                    isActive: !task.completed,
                })),
                totalCount: Number(totalCount),
            };
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

