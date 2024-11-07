import {
    ADD_TASK_ERROR,
    ADD_TASK_SUCCESS,
    DELETE_TASK_ERROR,
    DELETE_TASK_SUCCESS,
    FETCH_TASKS_ERROR,
    FETCH_TASKS_SUCCESS,
    SET_NOTIFICATION,
    UPDATE_TASK_ERROR,
    UPDATE_TASK_SUCCESS
} from '../actionTypes';

const initialState = {
    taskList: [],
    task: null,
    notification: {type: '', message: ''},
    error: null,
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_TASK':
            return {...state, task: action.payload};
        case FETCH_TASKS_SUCCESS:
            return {...state, taskList: action.payload, error: null};
        case FETCH_TASKS_ERROR:
            return {...state, error: action.payload};
        case ADD_TASK_SUCCESS:
            return {...state, taskList: [...state.taskList, action.payload], error: null};
        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                taskList: state.taskList.map(task => task.id === action.payload.id ? action.payload : task),
                task: null,
                error: null
            };
        case DELETE_TASK_SUCCESS:
            return {...state, taskList: state.taskList.filter(task => task.id !== action.payload), error: null};
        case SET_NOTIFICATION:
            return {...state, notification: action.payload};
        case ADD_TASK_ERROR:
        case UPDATE_TASK_ERROR:
        case DELETE_TASK_ERROR:
            return {...state, error: action.payload};
        default:
            return state;
    }
};

export default taskReducer;
