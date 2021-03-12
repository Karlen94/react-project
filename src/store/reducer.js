import * as actionTypes from './actionTypes';

const deafultState = {
    tasks: [],
    task: null,
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTasksSuccess: false,
    editTaskSuccess: false,
    loading: false,
    successMessage: null,
    errorMessage: null
};

export default function reducer(state = deafultState, action) {
    switch (action.type) {

        case actionTypes.GET_TASKS: {
            return {
                ...state,
                loading: false,
                tasks: action.tasks
            };
        }
        case actionTypes.GET_TASK: {
            return {
                ...state,
                loading: false,
                task: action.task
            };
        }
        case actionTypes.PENDING: {
            return {
                ...state,
                loading: true,
                addTaskSuccess: false,
                deleteTasksSuccess: false,
                editTaskSuccess: false,
                successMessage: null,
                errorMessage: null
            };
        }
        case actionTypes.ERROR: {
            return {
                ...state,
                loading: false,
                errorMessage: action.error
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
            if (action.from === 'single') {
                return {
                    ...state,
                    task: action.editedTask,
                    loading: false,
                    editTaskSuccess: true,
                    successMessage: 'Task edited successfully!'
                };
            }

            const tasks = [...state.tasks];
            const foundIndex = tasks.findIndex((task) => task._id === action.editedTask._id);
            tasks[foundIndex] = action.editedTask;

            return {
                ...state,
                tasks,
                loading: false,
                editTasksSuccess: true,
                successMessage: 'Task edited successfully!'
            };
        }
        default: return state;
    }


}
