import React, { FC } from 'react'
import { Container } from '@mui/material'
import { TodoStats } from '../../features/todo-stats/TodoStats'
import { TodoTask } from '../../shared/ui/todo/Todo'
import { ITask } from '../../shared/api/api'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store/store'
import { toggleTask } from '../../app/store/tasks/taskSlice'

export interface IDayProps {
    tasks: ITask[]
}

const Yesterday: FC<IDayProps> = ({ tasks }) => {
    const dispatch = useDispatch<AppDispatch>()
    const toggleTaskStatus = (id: number) => {
        dispatch(toggleTask(id))
    }

    return (
        <Container>
            <TodoStats tasks={tasks} day="yesterday" />
            {tasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                    deleteTask={() => {}}
                    handleEditModalOpen={() => {}}
                />
            ))}
        </Container>
    )
}

export { Yesterday }
