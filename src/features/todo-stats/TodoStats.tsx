import { FC, Fragment } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { ITask } from '../../shared/api/api'

export interface ITodoStatsProps {
    tasks: ITask[]
    day: string
}

const TodoStats: FC<ITodoStatsProps> = ({ tasks, day }) => {
    const completedTasks = tasks.filter((task) => task.isActive).length
    const totalTasks = tasks.length

    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '10%' }} />
                <Typography variant="h6" component="h2" className="day-title">
                    {day}
                </Typography>

                <Typography
                    variant="h6"
                    component="h2"
                    className="title-completedTask"
                >
                    {completedTasks}/{totalTasks} completed
                </Typography>
            </Container>
        </Fragment>
    )
}

export { TodoStats }
