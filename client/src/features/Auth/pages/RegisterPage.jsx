import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard.jsx";
import InputField from "../components/InputField.jsx";
import axiosInstance from "../../../shared/config/axios.js";
import { Link } from "react-router-dom";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle.js";

function RegisterPage() {
    // États pour stocker les valeurs des champs de saisie
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useDocumentTitle('Register')

    // Redirection vers la page d'accueil si un token est déjà présent dans le localStorage
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    // Gestionnaire de soumission du formulaire d'inscription
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page lors de la soumission

        // Vérifie si les mots de passe correspondent avant de continuer
        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            // Envoi de la requête d'inscription à l'API
            const response = await axiosInstance.post('/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            // Stocke le token dans le localStorage en cas de succès
            localStorage.setItem('token', response.data.token);

            // Redirige vers la page d'accueil
            navigate('/');
        } catch (error) {
            // Affiche un message d'erreur si l'inscription échoue
            console.error("Erreur lors de l'inscription", error.response?.data);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="container">
            <AuthFormCard>
                <form onSubmit={handleSubmit}>
                    {/*ToDo: Faire comme dans le login et avoir l'erreur ici au lieu d'utiliser l'alert*/}

                    <h3 className="my-4">Créez un compte</h3>

                    <InputField
                        label="Nom"
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                    />

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
                        autoComplete="new-password"
                    />

                    <InputField
                        label="Confirmer le mot de passe"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        autoComplete="new-password"
                    />

                    <button type="submit" className="btn btn-primary py-3 w-100">S'inscrire</button>

                    <p className="text-center mt-3">Vous avez déjà un compte ? <Link to="/auth/login">Connectez-vous</Link></p>
                </form>
            </AuthFormCard>
        </div>
    );
}

export default RegisterPage;
