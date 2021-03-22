import request from '../helpersFunctions/request';
import * as actionTypes from './actionTypes';
import { history } from '../helpersFunctions/history';


const apiHost = process.env.REACT_APP_API_HOST;

export function getTasks(params = {}) {
    const query = Object.entries(params).map(([key, value]) => `${key}=${value}`).join('&');

    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task?${query}`)
            .then((tasks) => {
                dispatch({ type: actionTypes.GET_TASKS, tasks: tasks })
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }

};

export function getTask(taskId) {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request(`${apiHost}/task/${taskId}`)
            .then((task) => {
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
            .then(() => {
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
            .then(() => {
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
                dispatch({
                    type: actionTypes.EDIT_TASK,
                    editedTask, from,
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
        request(`${apiHost}/user`, 'POST', data)
            .then((result) => {
                console.log('result', result)

            })
            .catch((err) => {
                dispatch({
                    type: actionTypes.ERROR,
                    error: err.message
                });
            });
    }
}