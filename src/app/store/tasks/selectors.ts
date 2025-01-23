import { createSelector } from '@reduxjs/toolkit'
import { ITask } from '../../../shared/api/api'

interface ITasksStateProps {
    tasks: {
        tasks: ITask[]
        filter: string
    }
}

export const selectTasksState = (state: ITasksStateProps) => state.tasks || {}

export const selectTasks = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.tasks || ([] as ITask[]),
)

export const selectFilterTask = createSelector(
    [selectTasksState],
    (tasksState) => tasksState.filter || 'all',
)

export const selectFilteredTasks = createSelector(
    [selectTasks, selectFilterTask],
    (tasks, filter) => {
        switch (filter) {
            case 'active':
                return tasks.filter((task) => !task.isActive)
            case 'completed':
                return tasks.filter((task) => task.isActive)
            default:
                return tasks
        }
    },
)
