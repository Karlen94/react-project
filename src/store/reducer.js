const deafultState = {
    tasks: [],
    addTaskSuccess: false,
    deleteTasksSuccess: false
};

export default function reducer(state = deafultState, action) {
    switch (action.type) {
        case 'INCREMENT': {
            return {
                ...state,
                count: state.count + 1
            };
        }
        case 'DECREMENT': {
            return {
                ...state,
                count: state.count - 1
            };
        }
        case 'GET_TASKS': {
            return {
                ...state,
                tasks: action.tasks
            };
        }
        case 'ADD_TASK': {
            const tasks = [...state.tasks, action.task];

            return {
                ...state,
                tasks,
                addTaskSuccess: true
            };
        }
        case 'ADDING_TASK': {

            return {
                ...state,
                addTaskSuccess: false
            };
        }
        case 'DELETE_TASK': {

            return {
                ...state,
                tasks: state.tasks.filter((task) => action.taskId !== task._id)
            };
        }
        case 'DELETE_TASKS': {
            const newTasks = state.tasks.filter((elem) => {
                if (action.taskIds.has(elem._id)) {
                    return false;
                } else {
                    return true;
                }
            });

            return {
                ...state,
                tasks: newTasks,
                deleteTasksSuccess: true
            };
        }
        // case 'DELETING_TASK': {

        //     return {
        //         ...state,
        //         deleteTasksSuccess: true
        //     };
        // }
        default: return state;
    }


}
