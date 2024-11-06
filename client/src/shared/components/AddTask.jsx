import { useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import axiosInstance from "../config/axios.js";

// Définition des types attendus pour les props avec PropTypes
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
    // Référence pour le champ d'entrée du titre de la tâche
    const inputRef = useRef();

    // Focus automatique sur le champ d'entrée du titre si une tâche est en cours d'édition
    useEffect(() => {
        if (task.id) {
            inputRef.current.focus();
        }
    }, [task]);

    // Réinitialise les notifications après 5 secondes
    useEffect(() => {
        if (notification.message) {
            const timer = setTimeout(() => {
                setNotification({ type: '', message: '' });
            }, 5000);

            return () => clearTimeout(timer);
        }
    }, [notification, setNotification]);

    // Gestionnaire de soumission du formulaire pour ajouter ou mettre à jour une tâche
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page

        // Récupère et nettoie les valeurs des champs de saisie
        const title = e.target.taskName.value.trim();
        const description = e.target.description.value.trim();
        const due_date = e.target.dueDate.value.trim();
        const status = e.target.status.value === "completed" ? 1 : 0;

        // Vérifie que tous les champs sont remplis
        if (title && description && due_date) {
            try {
                let response;

                // Si un identifiant de tâche est présent, la tâche est mise à jour ; sinon, elle est ajoutée
                if (task.id) {
                    response = await axiosInstance.put(`/tasks/${task.id}`, {
                        title,
                        description,
                        due_date,
                        status,
                    });

                    // Met à jour la liste des tâches en cas de succès
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
                    });

                    // Ajoute la nouvelle tâche à la liste en cas de succès
                    if (response.status === 201) {
                        setTaskList([...taskList, response.data]);
                        setNotification({ type: MESSAGE_TYPES.SUCCESS, message: "Tâche ajoutée avec succès" });
                    }
                }

                // Réinitialise l'état de la tâche après l'opération
                setTask({});
            } catch (error) {
                // Définit une notification d'erreur en cas d'échec de l'ajout/mise à jour
                const errorMessage = error.response?.data?.message || "Erreur lors de la sauvegarde de la tâche.";
                setNotification({ type: MESSAGE_TYPES.ERROR, message: errorMessage });
            }
        } else {
            // Notification d'erreur si des champs sont manquants
            setNotification({ type: MESSAGE_TYPES.ERROR, message: "Tous les champs sont obligatoires." });
        }
    };

    return (
        <>
            {/* Affiche les notifications en fonction de leur type */}
            {notification.type === MESSAGE_TYPES.ERROR && <div className="alert alert-danger">{notification.message}</div>}
            {notification.type === MESSAGE_TYPES.SUCCESS && <div className="alert alert-success">{notification.message}</div>}

            {/* Formulaire pour ajouter ou mettre à jour une tâche */}
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
