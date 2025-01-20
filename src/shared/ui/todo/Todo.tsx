import React from "react";
import {Container, Card, Typography,CardContent,IconButton,Box,Checkbox} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TodoTask = ({task, onToggle, deleteTask,handleEditModalOpen}) => {
    
    return ( 
        <Container>

            <Box
                className='box-task'
            >

                <Checkbox className='checkbox-task'
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon />}
                          checked={task.isActive}
                          onChange={() => onToggle(task.id)}
                />
            <Card variant = 'outlined' className='card'>

                <CardContent>
                <Box className='card-content-box'>
                    <Box className={`decoration-box ${task.isActive ? 'active' : ''}`}>
                    <Typography gutterBottom variant="h5" component="div" className='title-todo-task'>
                        {task.title}
                    </Typography>
                    <Typography variant="body2" className='description-todo-task'>
                        {task.description}
          </Typography>
                    </Box>

          <Box className='icon-task-box'>
                <Typography variant="h5" component="h2"> 
                    <IconButton onClick={handleEditModalOpen}>
                        <EditIcon className='icon-task'/>
                        </IconButton>
                        <IconButton onClick={() => deleteTask(task.id)}>
                   <DeleteIcon />
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
