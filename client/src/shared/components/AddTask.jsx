import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { addTask, updateTask } from "../redux/actions/taskActions";

function AddTask({ task, setTask }) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        due_date: "",
        status: 0,
    });

    const [notification, setNotification] = useState("");
    const [formErrors, setFormErrors] = useState({
        title: false,
        description: false,
        due_date: false,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (task) {
            const formattedDate = task.due_date
                ? new Date(task.due_date).toISOString().slice(0, 16)
                : "";
            setFormData({
                title: task.title || "",
                description: task.description || "",
                due_date: formattedDate || "",
                status: task.status || 0,
            });
        }
    }, [task]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Réinitialiser l'erreur de champ dès que l'utilisateur modifie un champ
        setFormErrors({ ...formErrors, [name]: false });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Vérification que tous les champs sont remplis
        const errors = {
            title: !formData.title,
            description: !formData.description,
            due_date: !formData.due_date,
        };

        setFormErrors(errors);

        if (errors.title || errors.description || errors.due_date) {
            setNotification("Tous les champs doivent être remplis !");
            return;
        }

        // Si la notification est vide, on soumet les données
        setNotification("");

        if (task && task.id) {
            // Mise à jour de la tâche
            dispatch(updateTask({ ...formData, id: task.id }));
            dispatch({ type: 'SET_TASK', payload: null });
            setNotification("Tâche modifiée avec succès !");
        } else {
            // Ajout de la nouvelle tâche
            dispatch(addTask(formData));
            setNotification("Tâche ajoutée avec succès !");
        }

        // Réinitialiser le formulaire et la tâche
        setFormData({ title: "", description: "", due_date: "", status: 0 });
        setTask(null);

        // Masquer la notification après 5 secondes
        setTimeout(() => setNotification(""), 8000);
    };

    return (
        <div className="container my-5">
            <h2 className='mb-5 text-center'>Task Management</h2>

            {/* Afficher la notification si présente */}
            {notification && (
                <div className={`alert ${notification.includes("remplis") ? "alert-danger" : "alert-success"}`}>
                    {notification}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
                        name="title"
                        placeholder="Titre de la tâche"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {formErrors.title && <div className="invalid-feedback">Ce champ est requis</div>}
                </div>
                <div className="mb-3">
                    <textarea
                        className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
                        name="description"
                        placeholder="Description de la tâche"
                        value={formData.description}
                        onChange={handleChange}
                    />
                    {formErrors.description && <div className="invalid-feedback">Ce champ est requis</div>}
                </div>
                <div className="mb-3">
                    <input
                        type="datetime-local"
                        className={`form-control ${formErrors.due_date ? 'is-invalid' : ''}`}
                        name="due_date"
                        value={formData.due_date}
                        onChange={handleChange}
                    />
                    {formErrors.due_date && <div className="invalid-feedback">Ce champ est requis</div>}
                </div>
                <div className="mb-3">
                    <select
                        className="form-select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value={0}>En cours</option>
                        <option value={1}>Complété</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">
                    {task && task.id ? "Mettre à jour" : "Ajouter"}
                </button>
            </form>
        </div>
    );
}

AddTask.propTypes = {
    task: PropTypes.object,
    setTask: PropTypes.func.isRequired,
};

export default AddTask;
