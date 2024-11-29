import React from "react";
import {Container, Card, Typography,CardContent,IconButton,Box,Checkbox} from '@mui/material'
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import EditIcon from '@mui/icons-material/Edit';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Todo = () => {
    
    return ( 
        <Container>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center", // Выровнять элементы по вертикали
                }}
            >
                {/* Чекбокс */}
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
                />
            <Card variant = 'outlined' sx={{maxHeight: '90px', width: '1051px',mt: '22px', boxSizing: 'border-box', border: '1px solid rgb(227, 227, 227)', borderRadius:'8px'}}>
                <CardContent>
                <Box sx={{display: "grid", gridTemplateColumns: "1fr auto", alignItems: "start", gap: 2}}>
                    <Box>
                    <Typography gutterBottom variant="h5" component="div" sx={{fontFamily: 'Roboto', fontSize: '24px', fontWeight: '500'}}>
                        Cooking a salmon
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Salmon and tuna i think is good for dinner, i wanna make it today :D 
          </Typography>
                    </Box>

          <Box sx={{display: "flex", flexDirection: "row", gap: 1}}>
                <Typography variant="h5" component="h2"> 
                    <IconButton>
                        <EditIcon sx={{margin: "10px"}}/>
                        </IconButton>
                        <IconButton>
                   <MoreHorizOutlinedIcon />
                    </IconButton>
                </Typography>
                </Box>
                </Box>
                </CardContent>
            </Card>
            </Box>
        </Container>
     );
}

export default Todo;