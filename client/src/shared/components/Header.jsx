import {useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import axiosInstance from '../config/axios.js';
import {logout} from "../redux/actions/authActions.js";

export default function Header() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/auth/login');
                return;
            }

            // Envoie la requête de déconnexion
            await axiosInstance.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Supprime le token du localStorage et de Redux
            localStorage.removeItem('token');
            dispatch(logout());

            // Redirige vers la page de connexion
            navigate('/auth/login');
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error.response || error.message);
        }
    };

    return (
        <header className="bg-dark text-light py-3">
            <div className="container d-flex justify-content-between align-items-center">
                <div className="logo d-flex align-items-center">
                    <span className="fs-4 fw-bold">Youpi Task Management App</span>
                </div>

                <div>
                    <button className="px-4 py-2 rounded bg-white" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
}
