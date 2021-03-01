import * as actionTypes from './actionTypes';

const deafultState = {
    tasks: [],
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTaskSuccess: false,
    loading: false,
    successMessage: '',
    errorMessage: ''
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
        case actionTypes.GET_TASKS: {
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            };
        }
        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                deleteTasksSuccess: false,
                editTaskSuccess: false
            };
        }
        case actionTypes.ADD_TASK: {
            const tasks = [...state.tasks, action.task];

            return {
                ...state,
                tasks,
                loading: false,
                addTaskSuccess: true,
                successMessage: 'Task created successfully!'
            };
        }
        case actionTypes.DELETE_TASK: {

            return {
                ...state,
                loading: false,
                tasks: state.tasks.filter((task) => action.taskId !== task._id),
                successMessage: 'Task deleted successfully!'
            };
        }
        case actionTypes.DELETE_TASKS: {
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
                loading: false,
                deleteTasksSuccess: true,
                successMessage: 'Tasks deleted successfully!'
            };
        }
        case actionTypes.EDIT_TASK: {
            const tasks = [...state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
            tasks[foundIndex] = action.editedTask;

            return {
                ...state,
                tasks,
                loading: false,
                editTaskSuccess: true,
                successMessage: 'Task edited successfully!'
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
