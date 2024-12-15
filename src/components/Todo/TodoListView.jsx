import React, {useState} from "react";
import {Container} from "@mui/material";
import {TodoList} from "../Main/TodoList";
import {TodoTask} from "./Todo";

const TodoListView = ({day,saveTask}) => {
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
            <TodoList tasks={tasks} day={day}/>
            {tasks.map((task) => (
                <TodoTask
                    key={task.id}
                    task={task}
                    onToggle={toggleTaskStatus}
                    OnSave={saveTask}
                />
            ))}
        </Container>
    );
};

export {TodoListView};