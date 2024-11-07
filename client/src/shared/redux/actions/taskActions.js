import axiosInstance from "../../config/axios.js";
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

export const setNotification = (notification) => ({
    type: SET_NOTIFICATION,
    payload: notification
});

export const fetchTasks = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/tasks");
        dispatch({type: FETCH_TASKS_SUCCESS, payload: response.data});
    } catch (error) {
        dispatch({type: FETCH_TASKS_ERROR, payload: "Erreur lors du chargement des tâches."});
    }
};

export const addTask = (task) => async (dispatch) => {
    try {
        const response = await axiosInstance.post('/tasks', task);
        dispatch({type: ADD_TASK_SUCCESS, payload: response.data});
        dispatch({type: SET_NOTIFICATION, payload: {type: 'success', message: "Tâche ajoutée avec succès"}});
    } catch (error) {
        dispatch({type: ADD_TASK_ERROR, payload: "Erreur lors de l'ajout de la tâche."});
        dispatch({type: SET_NOTIFICATION, payload: {type: 'error', message: "Erreur lors de l'ajout de la tâche."}});
    }
};

export const updateTask = (task) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/tasks/${task.id}`, task);
        dispatch({type: UPDATE_TASK_SUCCESS, payload: response.data});
        dispatch(setNotification({type: 'success', message: "Tâche mise à jour"}));
    } catch (error) {
        dispatch({type: UPDATE_TASK_ERROR, payload: "Erreur lors de la mise à jour de la tâche."});
        dispatch(setNotification({type: 'error', message: "Erreur lors de la mise à jour de la tâche."}));
    }
};

export const setTask = (task) => ({
    type: 'SET_TASK',
    payload: task,
});

export const deleteTask = (taskId) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/tasks/${taskId}`);
        dispatch({type: DELETE_TASK_SUCCESS, payload: taskId});
        dispatch({type: SET_NOTIFICATION, payload: {type: 'success', message: "Tâche supprimée avec succès"}});
    } catch (error) {
        dispatch({type: DELETE_TASK_ERROR, payload: "Erreur lors de la suppression de la tâche."});
        dispatch({
            type: SET_NOTIFICATION,
            payload: {type: 'error', message: "Erreur lors de la suppression de la tâche."}
        });
    }
};
