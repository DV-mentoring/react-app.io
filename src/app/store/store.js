import {configureStore} from '@reduxjs/toolkit'
import {tasks} from "./tasks";


export const store = configureStore({
    reducer: {
        tasks: tasks,
    }
});