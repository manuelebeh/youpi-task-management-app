import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "../config/axios.js";

AddTask.propTypes = {
    taskList: PropTypes.array.isRequired,
    setTaskList: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
    setTask: PropTypes.func.isRequired,
    notification: PropTypes.object.isRequired,
    setNotification: PropTypes.func.isRequired,
    MESSAGE_TYPES: PropTypes.object.isRequired
};

export default function AddTask({ taskList, setTaskList, task, setTask, notification, setNotification, MESSAGE_TYPES }) {
    const inputRef = useRef();

    useEffect(() => {
        if (task.id) {
            inputRef.current.focus();
        }
    }, [task]);

    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ type: '', message: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification, setNotification]);

    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const title = e.target.taskName.value.trim();
        const description = e.target.description.value.trim();
        const due_date = e.target.dueDate.value.trim();
        const status = e.target.status.value === "completed" ? 1 : 0;

        if (title && description && due_date) {
            try {
                let response;

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                };

                if (task.id) {
                    response = await axiosInstance.put(`/tasks/${task.id}`, {
                        title,
                        description,
                        due_date,
                        status,
                    }, config);

                    if (response.status === 200) {
                        const updatedTaskList = taskList.map((todo) =>
                            todo.id === task.id ? response.data : todo
                        );
                        setTaskList(updatedTaskList);
                        setNotification({ type: MESSAGE_TYPES.SUCCESS, message: "Tâche mise à jour" });
                    }
                } else {
                    response = await axiosInstance.post('/tasks', {
                        title,
                        description,
                        due_date,
                        status,
                    }, config);

                    if (response.status === 201) {
                        setTaskList([...taskList, response.data]);
                        setNotification({ type: MESSAGE_TYPES.SUCCESS, message: "Tâche ajoutée avec succès" });
                    }
                }

                setTask({});
            } catch (error) {
                const errorMessage = error.response?.data?.message || "Erreur lors de la sauvegarde de la tâche.";
                setNotification({ type: MESSAGE_TYPES.ERROR, message: errorMessage });
            }
        } else {
            setNotification({ type: MESSAGE_TYPES.ERROR, message: "Tous les champs sont obligatoires." });
        }
    };

    return (
        <>
            {notification.type === MESSAGE_TYPES.ERROR && <div className="alert alert-danger">{notification.message}</div>}
            {notification.type === MESSAGE_TYPES.SUCCESS && <div className="alert alert-success">{notification.message}</div>}

            <section className="addTask container my-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            ref={inputRef}
                            type="text"
                            className="form-control"
                            name="taskName"
                            placeholder="Titre de la tâche"
                            value={task.title || ""}
                            onChange={e => setTask({ ...task, title: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            name="description"
                            placeholder="Description de la tâche"
                            value={task.description || ""}
                            onChange={e => setTask({ ...task, description: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            type="datetime-local"
                            className="form-control"
                            name="dueDate"
                            value={task.due_date || ""}
                            onChange={e => setTask({ ...task, due_date: e.target.value })}
                        />
                    </div>
                    <div className="mb-3">
                        <select
                            className="form-select"
                            name="status"
                            value={task.status === 1 ? "completed" : "not completed"}
                            onChange={e => setTask({ ...task, status: e.target.value === "completed" ? 1 : 0 })}
                        >
                            <option value="not completed">Non terminée</option>
                            <option value="completed">Terminée</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">{task.id ? "Mettre à jour" : "Ajouter"}</button>
                </form>
            </section>
        </>
    );
}
