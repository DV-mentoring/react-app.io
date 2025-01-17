export const addTask = (title,description) => ({
    type: "ADD_TASK",
    payload: {title, description},
});

export const removeTask = (id) => ({
    type: "REMOVE_TASK",
    payload: {id},
});

export const editTask = (task) => ({
    type: "EDIT_TASK",
    payload: {task},
});

export const toggleTask = (id) => ({
    type: "TOGGLE_TASK",
    payload: {id},
})

export const filterTask = (filter) => ({
    type: "FILTER_TASK",
    payload: {filter}
})