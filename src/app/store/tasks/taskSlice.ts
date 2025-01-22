import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTasks, ITask } from '../../../shared/api/api'

interface IInitialState {
    tasks: ITask[]
    totalCount: number
    isLoading: boolean
    error: string | unknown
    filter: 'all' | 'active' | 'completed'
}

const initialState: IInitialState = {
    tasks: [],
    totalCount: 0,
    isLoading: false,
    error: undefined,
    filter: 'all',
}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<ITask>) => {
            state.tasks.push(action.payload)
            console.log(action.payload)
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(
                (task) => task.id !== action.payload,
            )
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload
                    ? { ...task, isActive: !task.isActive }
                    : task,
            )
        },
        editTask: (state, action: PayloadAction<ITask>) => {
            state.tasks = state.tasks.map((task) =>
                task.id === action.payload.id
                    ? { ...task, ...action.payload }
                    : task,
            )
        },
        filterTask: (
            state,
            action: PayloadAction<'all' | 'active' | 'completed'>,
        ) => {
            state.filter = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.isLoading = true
                state.error = ''
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state.isLoading = false
                state.tasks = action.payload.tasks
                state.totalCount = action.payload.totalCount
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.isLoading = false
                state.error = action.payload
            })
    },
})

export const taskReducer = tasksSlice.reducer
export const { addTask, removeTask, toggleTask, editTask, filterTask } =
    tasksSlice.actions
