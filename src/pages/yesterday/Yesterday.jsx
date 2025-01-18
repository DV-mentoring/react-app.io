import React from "react";
import {Container} from "@mui/material";
import {TodoStats} from "../../features/todo-stats/TodoStats";
import {TodoTask} from "../../shared/ui/todo/Todo";


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
            <TodoStats tasks={tasks} />
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