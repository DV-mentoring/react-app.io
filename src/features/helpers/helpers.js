export const filteredTasksByDay = (tasks, day) => {
    const today = new Date();
    return tasks.filter((task) => {
        const taskDate = new Date(task.date);
        if(day === "Yesterday") {
            const yesterday = new Date(today);
            yesterday.setDate(today.getDate() - 1);
            return taskDate.toDateString() === yesterday.toDateString();
        }
        if(day === "Upcoming") {
            return taskDate > today;
        }
        return taskDate.toDateString() === today.toDateString();
    })
}
