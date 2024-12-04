import {Fragment} from 'react';
import {useParams} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const TodoList = ({ tasks = [] }) => {
    const {day} = useParams();
    const completedTasks = tasks.filter(task => task.isActive).length;
    const totalTasks = tasks.length;

    return (
        <Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
                <Box sx={{ height: '10%' }} />
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: 'black', fontFamily: 'Roboto', fontSize: 48, fontWeight: '700' }}
                >
                    {day}
                </Typography>
                <Typography
                    variant="h6"
                    component="h2"
                    sx={{ color: 'rgb(65, 65, 65)', fontFamily: 'Roboto', fontSize: 24, fontWeight: '400' }}
                >
                    {completedTasks}/{totalTasks} completed
                </Typography>
            </Container>
        </Fragment>
    );
}

export {TodoList};