import request from '../helpersFunctions/request';
import * as actionTypes from './actionTypes';

export function getTasks() {
    return (dispatch) => {
        dispatch({ type: actionTypes.PENDING })
        request('http://localhost:3001/task')
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
        request(`http://localhost:3001/task/${taskId}`)
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
        request('http://localhost:3001/task', 'POST', newTask)
            .then((task) => {
                dispatch({ type: actionTypes.ADD_TASK, task });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
};

export function deleteTask(taskId) {
    return function (dispatch) {
        dispatch({ type: actionTypes.PENDING })
        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: 'DELETE_TASK', taskId });
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
        request(`http://localhost:3001/task`, 'PATCH', {
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
        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: actionTypes.EDIT_TASK, editedTask, from });
            })
            .catch((error) => {
                console.log(error);
                dispatch({ type: actionTypes.ERROR, error: error.message })
            })
    }
}