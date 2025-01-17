const initialState = {
    tasks: [],
    filter: "all",

};

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TASK":
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {
                        id: action.payload.id || Date.now(),
                        title: action.payload.title,
                        description: action.payload.description || '',
                        isActive: false,
                        date: action.payload.date || new Date().toISOString(),
                    },
                ],
            };

        case "TOGGLE_TASK": {
            return {
                tasks: state.tasks.map((task) => task.id === action.payload.id ? { ...task, isActive: !task.isActive } : task),
            }
        }

        case "REMOVE_TASK":
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload.id),
            }
        case "EDIT_TASK":
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id ? {...task, ...action.payload} : task
                ),
            }

        case "FILTER_TASK":
            return {
                ...state,
                filter: action.payload.filter,
            };
        default:
            return state;
    }
};