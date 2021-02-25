import request from '../helpersFunctions/request';

export function getTasks() {
    return (dispatch) => {
        request('http://localhost:3001/task')
            .then((tasks) => {
                dispatch({ type: 'GET_TASKS', tasks: tasks })
            })
    }

};

export function addTask(newTask) {
    return (dispatch) => {
        dispatch({ type: 'ADDING_TASK' })
        request('http://localhost:3001/task', 'POST', newTask)
            .then((task) => {
                dispatch({ type: 'ADD_TASK', task });
            })
    }
};

export function deleteTask(taskId) {
    return function (dispatch) {
        // dispatch({ type: 'DELETING_TASK' })
        request(`http://localhost:3001/task/${taskId}`, 'DELETE')
            .then(() => {
                dispatch({ type: 'DELETE_TASK', taskId });
            })
    }
};

export function deleteTasks(taskIds) {


    return function (dispatch) {
        request(`http://localhost:3001/task`, 'PATCH', {
            tasks: [...taskIds]
        })
            .then(() => {
                dispatch({ type: 'DELETE_TASKS', taskIds });
            })
    }
}

export function editTask(data) {


    return function (dispatch) {
        request(`http://localhost:3001/task/${data._id}`, 'PUT', data)
            .then((editedTask) => {
                dispatch({ type: 'EDIT_TASK', editedTask });
            })
    }
}