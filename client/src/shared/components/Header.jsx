import { useNavigate } from 'react-router-dom';
import axiosInstance from '../config/axios.js';

export default function Header() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');

            if (!token) {
                navigate('/auth/login');
                return;
            }

            await axiosInstance.post('/logout', {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            localStorage.removeItem('token');
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
