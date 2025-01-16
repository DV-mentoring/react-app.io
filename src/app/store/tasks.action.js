export const addTask = (task) => ({
    type: "ADD_TASK",
    payload: task,
});

export const removeTask = (id) => ({
    type: "REMOVE_TASK",
    payload: id,
});

export const editTask = (task) => ({
    type: "EDIT_TASK",
    payload: task,
});