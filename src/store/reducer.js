import * as actionTypes from './actionTypes';
import { checkLoginStatus } from '../helpersFunctions/auth';

const deafultState = {
    tasks: [],
    task: null,
    addTaskSuccess: false,
    deleteTasksSuccess: false,
    editTasksSuccess: false,
    editTaskSuccess: false,
    loading: false,
    successMessage: null,
    errorMessage: null,
    sendFormSucces: false,
    name: '',
    surname: '',
    isAuthenticated: checkLoginStatus(),
    mailAdress: ''
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
            if (action.from === 'single') {
                return {
                    ...state,
                    task: null,
                    loading: false,
                    successMessage: 'Task deleted successfully!'
                };
            }

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
            let successMessage = 'Task edited successfully!';
            if (action.status) {
                if (action.status === 'done') {
                    successMessage = 'Congrats, you have completed the task!';
                }
                else {
                    successMessage = 'The task is active now!';
                }
            }


            if (action.from === 'single') {
                return {
                    ...state,
                    task: action.editedTask,
                    loading: false,
                    editTaskSuccess: true,
                    successMessage: successMessage
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
                successMessage: successMessage
            };
        }
        case actionTypes.REGISTER_SUCCES: {
            return {
                ...state,
                loading: false,
                name: action.name,
                surname: action.surname,
                successMessage: 'Congrats, you are a new user now!',
            };
        }
        case actionTypes.LOGIN_SUCCES: {
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                name: state.name,
                surname: state.surname
            };
        }
        case actionTypes.LOGOUT: {
            return {
                ...state,
                loading: false,
                isAuthenticated: false
            };
        }
        case actionTypes.CONTACT: {
            return {
                ...state,
                loading: false,
                sendFormSucces: true,
                successMessage: 'Form send!'
            };
        }

        default: return state;
    }


}
