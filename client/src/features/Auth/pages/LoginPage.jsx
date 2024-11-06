import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard.jsx";
import InputField from "../components/InputField.jsx";
import axiosInstance from "../../../shared/config/axios.js";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle.js";

function LoginPage() {
    // États pour stocker les valeurs des champs de saisie et les messages d'erreur
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useDocumentTitle('Login')

    // Redirection vers la page d'accueil si un token est déjà présent dans le localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/");
        }
    }, [navigate]);

    // Gestionnaire de soumission du formulaire de connexion
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

        try {
            // Requête pour envoyer les informations de connexion
            const response = await axiosInstance.post('/login', {
                email,
                password,
            });

            // Stocke le token dans le localStorage en cas de succès
            localStorage.setItem("token", response.data.token);

            // Redirige vers la page d'accueil
            navigate("/");
        } catch (error) {
            // Affiche un message d'erreur si la connexion échoue
            console.error("Erreur lors de la connexion", error.response?.data);
            setError("Adresse email ou mot de passe incorrect");
        }
    };

    return (
        <div className="container">
            <AuthFormCard>
                <form onSubmit={handleSubmit}>
                    <div className="text-center">
                        {error && <p className="text-danger">{error}</p>}
                    </div>
                    <h3 className="my-4">Connectez-vous</h3>

                    <InputField
                        label="Adresse Mail"
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="username"
                    />

                    <InputField
                        label="Mot de passe"
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="current-password"
                    />

                    <button type="submit" className="btn btn-primary py-3 w-100">Connexion</button>

                    <p className='text-center mt-3'>Vous êtes nouveau ? <Link to='/auth/register'>Inscrivez
                        vous</Link></p>
                </form>
            </AuthFormCard>
        </div>
    );
}

export default LoginPage;
