import React from "react";
import {Container} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";


const Yesterday = ({tasks, setTasks}) => {

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

export {Yesterday};