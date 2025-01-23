import React, { FC } from 'react'
import { Container } from '@mui/material'
import { TodoStats } from '../../features/todo-stats/TodoStats'
import { TodoTask } from '../../shared/ui/todo/Todo'
import { IDayProps } from '../yesterday/Yesterday'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../app/store/store'
import { toggleTask } from '../../app/store/tasks/taskSlice'

const Upcoming: FC<IDayProps> = ({ tasks }) => {
    const dispatch = useDispatch<AppDispatch>()
    const toggleTaskStatus = (id: number) => {
        dispatch(toggleTask(id))
    }

    return (
        <Container>
            <TodoStats tasks={tasks} day="upcoming" />
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

export { Upcoming }
