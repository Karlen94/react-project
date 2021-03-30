import request from '../helpersFunctions/request';
import * as actionTypes from './actionTypes';
import { history } from '../helpersFunctions/history';
import { saveToken } from '../helpersFunctions/auth';
import requestWithoutToken from '../helpersFunctions/auth';


const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                if (!tasks) return;
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks })
            })
            .catch((error) => {
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }

};

export function getTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
                if (!task) return;
                dispatch({ type: actionTypes.GET_TASK, task })
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }

};

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task`, 'POST', newTask)
            .then((task) => {
                if (!task) return;
                dispatch({ type: actionTypes.ADD_TASK, task });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
};

export function deleteTask(taskId, from) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${taskId}`, 'DELETE')
            .then((res) => {
                if (!res) return;
                dispatch({ type: 'DELETE_TASK', taskId, from });
                if (from === 'single') {
                    history.push('/');
                }

            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
};

export function deleteTasks(taskIds) {


    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost} /task`, 'PATCH', {
            tasks: [...taskIds]
        })
            .then((res) => {
                if (!res) return;
                dispatch({ type: 'DELETE_TASKS', taskIds });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

export function editTask(data, from) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                if (!editedTask) return;
                dispatch({
                    type: actionTypes.EDIT_TASK,
                    editedTask, 
                    from,
                    status: data.status
                });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}

export function register(data) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING });
        requestWithoutToken(`${apiHost}/user`, 'POST', data)
            .then(() => {
                let name = data.name;
                let surname = data.surname;
                dispatch({
                    type: actionTypes.REGISTER_SUCCES,
                    name,
                    surname
                });
                history.push('/login');
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function login(data) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING });
        requestWithoutToken(`${apiHost}/user/sign-in`, 'POST', data)
            .then((result) => {
                saveToken(result);

                dispatch({
                    type: actionTypes.LOGIN_SUCCES,
                });
                history.push('/');
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function contactForm(data) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING });
        requestWithoutToken(`${apiHost}/form`, 'POST', data)
            .then(() => {
                dispatch({
                    type: actionTypes.CONTACT,
                });
                history.push('/contact');
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}

export function getUserInfo() {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING });
        request(`${apiHost}/user`)
            .then((res) => {
                if (!res) return;
                dispatch({
                    type: actionTypes.GET_USER_INFO, 
                   name:res.name,
                   surname: res.surname
                });
            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}