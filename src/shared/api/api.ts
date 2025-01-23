import { createAsyncThunk } from '@reduxjs/toolkit'
import { BASE_URL } from '../../features/helpers/constants'

export interface ITask {
    id: number
    title: string
    description?: string
    date: string
    isActive: boolean
}

export interface IServerTask {
    id: number
    title: string
    completed: boolean
}

export interface IFetchTasksParams {
    currentPage: number
    limit: number
}
export interface IFetchTasksResponse {
    tasks: ITask[]
    totalCount: number
}
export const fetchTasks = createAsyncThunk<
    IFetchTasksResponse,
    IFetchTasksParams
>('tasks/fetchTasks', async ({ currentPage, limit }, thunkAPI) => {
    try {
        const response = await fetch(
            `${BASE_URL}/todos?_page=${currentPage}&_limit=${limit}`,
        )
        if (!response.ok) {
            throw new Error('Error fetching tasks')
        }
        const totalCount = response.headers.get('X-Total-Count')
        const data = await response.json()
        return {
            tasks: data.map((task: IServerTask) => ({
                id: task.id,
                title: task.title,
                date: new Date(),
                isActive: task.completed,
            })),
            totalCount: Number(totalCount),
        }
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error.message)
    }
})
