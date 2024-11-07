import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "../redux/actions/taskActions";
import { useState } from "react";

export default function ShowTask() {
    const dispatch = useDispatch();
    const { taskList } = useSelector((state) => state.tasks);
    const [notification, setNotification] = useState(null); // Nouvel état pour la notification

    const formatDate = (date) => {
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    };

    const handleEdit = (id) => {
        const selectedTask = taskList.find((task) => task.id === id);
        dispatch({ type: "SET_TASK", payload: selectedTask });
    };

    const handleDelete = (id) => {
        dispatch(deleteTask(id));
        setNotification({ type: "success", message: "Tâche supprimée avec succès !" });

        // Masquer la notification après 5 secondes
        setTimeout(() => setNotification(null), 5000);
    };

    return (
        <section className="showTask container">
            <div className="d-flex justify-content-between mb-3">
                <div className="flex-fill align-items-center justify-content-center">
                    <span className="h4">Todo</span>
                    <span className="badge bg-primary ms-2">{taskList.length}</span>
                </div>
            </div>

            {/* Afficher la notification si présente */}
            {notification && (
                <div className={`alert ${notification.type === "success" ? "alert-success" : "alert-danger"}`}>
                    {notification.message}
                </div>
            )}

            {taskList.length > 0 ? (
                <ul className="list-group">
                    {taskList.map((task) => (
                        <li
                            key={task.id}
                            className="list-group-item d-flex justify-content-between align-items-center mb-4"
                        >
                            <div>
                                <p className="mb-1">
                                    <strong>{task.title}</strong>
                                </p>
                                <p className="mb-1">{task.description}</p>
                                <small>{`Échéance: ${formatDate(task.due_date)}`}</small>
                                <p>Status: {task.status === 1 ? "Complété" : "En cours"}</p>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleEdit(task.id)}
                                    className="btn btn-warning btn-sm me-2"
                                >
                                    Modifier
                                </button>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="btn btn-danger btn-sm"
                                >
                                    Supprimer
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : null}
        </section>
    );
}

ShowTask.propTypes = {
    notification: PropTypes.shape({
        type: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
    }),
};
