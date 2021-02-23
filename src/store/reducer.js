const deafultState = {
    tasks: [],
    addTaskSuccess: false
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
        default: return state;
    }


}
