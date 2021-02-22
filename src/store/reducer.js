const deafultState = { 
    tasks: []
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
        default: return state;
    }


}
