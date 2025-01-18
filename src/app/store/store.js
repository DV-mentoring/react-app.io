import {configureStore} from '@reduxjs/toolkit'
import {tasks} from "./tasks/reducers";
import {taskReducer} from "./tasks/taskSlice";


export const store = configureStore({
    reducer: {
        tasks: tasks, // При передаче taskReducer функционал пропадает
    }
});