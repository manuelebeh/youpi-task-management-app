import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axiosInstance from "../config/axios.js";

export default function ShowTask({ taskList, setTaskList, setTask, setNotification, MESSAGE_TYPES }) {
    // État pour gérer le statut de chargement des tâches
    const [loading, setLoading] = useState(true);

    // Fonction pour formater la date d'échéance au format français
    const formatDate = (date) => {
        return new Intl.DateTimeFormat("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
        }).format(new Date(date));
    };

    // Fonction pour sélectionner une tâche à éditer
    const handleEdit = (id) => {
        // Trouve la tâche correspondante par son identifiant et met à jour l'état 'task'
        const selectedTask = taskList.find((task) => task.id === id);
        setTask(selectedTask);
    };

    // Fonction pour supprimer une tâche
    const handleDelete = async (id) => {
        try {
            // Effectue la requête de suppression de la tâche via l'API
            const response = await axiosInstance.delete(`/tasks/${id}`);

            // Si la suppression réussit, met à jour la liste des tâches
            if (response.status === 200) {
                const newTaskList = taskList.filter((task) => task.id !== id);
                setTaskList(newTaskList);
                setNotification({ type: MESSAGE_TYPES.SUCCESS, message: "Tâche supprimée avec succès" });
            } else {
                setNotification({ type: MESSAGE_TYPES.ERROR, message: "Erreur lors de la suppression de la tâche." });
            }
        } catch (error) {
            console.error("Erreur lors de la suppression de la tâche", error.response || error.message);
            const errorMessage = error.response?.data?.message || "Erreur réseau ou serveur.";
            setNotification({ type: MESSAGE_TYPES.ERROR, message: errorMessage });
        }
    };

    // Effet qui vérifie si la liste des tâches est vide et met à jour l'état 'loading'
    useEffect(() => {
        if (taskList.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [taskList]); // Dépend de taskList pour se mettre à jour lorsque celle-ci change

    // Affiche un message de chargement si les tâches sont en train d'être récupérées
    if (loading) {
        return <div className='container'>Chargement des tâches...</div>;
    }

    return (
        <section className="showTask container">
            <div className="d-flex justify-content-between mb-3">
                <div className='flex-fill align-items-center justify-content-center'>
                    <span className="h4">Todo</span>
                    {/* Affiche le nombre total de tâches */}
                    <span className="badge bg-primary ms-2">{taskList.length}</span>
                </div>
            </div>
            <ul className="list-group">
                {/* Affiche chaque tâche dans la liste */}
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
                            {/* Formate et affiche la date d'échéance */}
                            <small>{`Échéance: ${formatDate(task.due_date)}`}</small>
                            <p>Status: {task.status === 1 ? "Complété" : "En cours"}</p>
                        </div>
                        <div>
                            {/* Boutons pour modifier ou supprimer la tâche */}
                            <button onClick={() => handleEdit(task.id)} className="btn btn-warning btn-sm me-2">
                                Modifier
                            </button>
                            <button onClick={() => handleDelete(task.id)} className="btn btn-danger btn-sm">
                                Supprimer
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </section>
    );
}

// Définition des types attendus pour les props avec PropTypes
ShowTask.propTypes = {
    taskList: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            due_date: PropTypes.string.isRequired,
            status: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]).isRequired,
        })
    ).isRequired,
    setTaskList: PropTypes.func.isRequired,
    setTask: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    MESSAGE_TYPES: PropTypes.object.isRequired,
};
