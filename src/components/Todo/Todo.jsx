import React from "react";
import {TodoList} from "../Main/TodoList";
import {Container, Card, Typography,CardContent,IconButton,Box,Checkbox} from '@mui/material'
import {useState} from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Todo = () => {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Task 1", description: "Description of task 1", isActive: true },
        { id: 2, title: "Task 2", description: "Description of task 2", isActive: false },
        { id: 3, title: "Task 3", description: "Description of task 3", isActive: true },
        { id: 4, title: "Task 1", description: "Description of task 1", isActive: true },

    ]);

    const toggleTaskStatus = (id) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, isActive: !task.isActive } : task
            )
        );
    };

    return (
        <Container>
            <TodoList tasks={tasks} />
            {tasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                />
            ))}
        </Container>
    );
};

const TodoTask = ({task, onToggle, deleteTask,handleEditModalOpen}) => {
    
    return ( 
        <Container>

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >

                <Checkbox sx={{
                    '&.MuiCheckbox-colorPrimary': {
                        color: '#FF4F5A',
                        '&.Mui-checked': {
                            color: '#FF4F5A',
                        },
                    }
                }}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                          checked={task.isActive}
                          onChange={() => onToggle(task.id)}
                />
            <Card variant = 'outlined' sx={{
                maxHeight: '90px', width: '1051px',mt: '22px', boxSizing: 'border-box',
                border: '1px solid rgb(227, 227, 227)', borderRadius:'8px'}}>

                <CardContent>
                <Box sx={{display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 2}}>
                    <Box
                        sx={{
                        textDecoration: task.isActive ? "line-through" : "none",
                        opacity: task.isActive ? 0.5 : 1,
                    }}>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontSize: '24px', fontWeight: '500'}}>
                        {task.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {task.description}
          </Typography>
                    </Box>

          <Box sx={{display: "flex", flexDirection: "row", gap: 1}}>
                <Typography variant="h5" component="h2"> 
                    <IconButton>
                        <EditIcon onClick={handleEditModalOpen} sx={{margin: "10px"}}/>
                        </IconButton>
                        <IconButton>
                   <DeleteIcon onClick={() => deleteTask(task.id)} />
                    </IconButton>
                </Typography>
                </Box>
                </Box>
                </CardContent>
            </Card>
            </Box>
        </Container>
     );
};

export {TodoTask};
export {Todo};