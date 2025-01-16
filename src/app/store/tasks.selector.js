export const selectTasks = (state) => state.tasks.tasks;
export const selectTaskById = (state, id) =>
    state.tasks.tasks.find((task) => task.id === id);