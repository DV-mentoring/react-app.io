
export const addTask = (task) => ({
    type: "ADD_TASK",
    payload: {
        id: Date.now(),
        title: task.title,
        description: task.description,
        isActive: false,
        date: new Date().toISOString(),
    },
});

export const removeTask = (id) => ({
    type: "REMOVE_TASK",
    payload: {id},
});

export const editTask = (task) => ({
    type: "EDIT_TASK",
    payload: task,
});

export const toggleTask = (id) => ({
    type: "TOGGLE_TASK",
    payload: {id},
})

export const filterTask = (filter) => ({
    type: "FILTER_TASK",
    payload: {filter},
})