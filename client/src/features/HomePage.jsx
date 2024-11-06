import Header from "../shared/components/Header.jsx";
import ShowTask from "../shared/components/ShowTask.jsx";
import { useEffect, useState } from "react";
import AddTask from "../shared/components/AddTask.jsx";
import axiosInstance from "../shared/config/axios.js";
import useDocumentTitle from "../shared/hooks/useDocumentTitle.js";

function HomePage() {
    const [taskList, setTaskList] = useState([]);
    const [task, setTask] = useState({});
    const [notification, setNotification] = useState({ type: '', message: '' });
    const [error, setError] = useState(null);

    const MESSAGE_TYPES = {
        ERROR: 'error',
        SUCCESS: 'success'
    };

    useDocumentTitle('HomePage');  // Change le titre de la page dans l'onglet du navigateur

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get("/tasks");

                // Vérification du format des données reçues
                if (Array.isArray(response.data)) {
                    setTaskList(response.data);
                } else {
                    setError("Format de réponse inattendu pour les tâches.");
                    setNotification({ type: MESSAGE_TYPES.ERROR, message: "Erreur dans le format des tâches." });
                }
            } catch (error) {
                console.error("Erreur lors du chargement des tâches", error);
                setError("Erreur lors du chargement des tâches.");
                setNotification({ type: MESSAGE_TYPES.ERROR, message: "Erreur lors du chargement des tâches." });
            }
        };

        fetchTasks();
    }, []);  // L'effet ne se déclenche qu'une seule fois lors du premier rendu du composant

    if (error) {
        return <div>{error}</div>;  // Affiche l'erreur en cas de problème
    }

    return (
        <>
            <Header />
            <AddTask
                taskList={taskList}
                setTaskList={setTaskList}
                task={task}
                setTask={setTask}
                notification={notification}
                setNotification={setNotification}
                MESSAGE_TYPES={MESSAGE_TYPES}
            />
            <ShowTask
                taskList={taskList}
                setTaskList={setTaskList}
                setTask={setTask}
                notification={notification}
                setNotification={setNotification}
                MESSAGE_TYPES={MESSAGE_TYPES}
            />
        </>
    );
}

export default HomePage;
