import Header from "../shared/components/Header.jsx";
import ShowTask from "../shared/components/ShowTask.jsx";
import AddTask from "../shared/components/AddTask.jsx";
import {useDispatch, useSelector} from "react-redux";
import useDocumentTitle from "../shared/hooks/useDocumentTitle.js";
import {fetchTasks} from "../shared/redux/actions/taskActions.js";
import {useEffect} from "react";

function HomePage() {
    const dispatch = useDispatch();
    const task = useSelector((state) => state.tasks.task);
    useSelector((state) => state.tasks.taskList);
    useDocumentTitle('HomePage');

    // Charger les tâches lors du premier rendu du composant
    useEffect(() => {
        dispatch(fetchTasks());
    }, [dispatch]);

    return (
        <>
            <Header/>
            <AddTask
                task={task}
                setTask={(task) => dispatch({type: 'SET_TASK', payload: task})}
            />
            <ShowTask/>
        </>
    );
}

export default HomePage;
