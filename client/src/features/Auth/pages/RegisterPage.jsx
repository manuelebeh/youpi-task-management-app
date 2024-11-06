import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthFormCard from "../components/AuthFormCard.jsx";
import InputField from "../components/InputField.jsx";
import axiosInstance from "../../../shared/config/axios.js";
import { Link } from "react-router-dom";

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate('/');
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        try {
            const response = await axiosInstance.post('/register', {
                name,
                email,
                password,
                password_confirmation: confirmPassword,
            });

            localStorage.setItem('token', response.data.token);

            navigate('/');
        } catch (error) {
            console.error("Erreur lors de l'inscription", error.response?.data);
            alert("Erreur lors de l'inscription");
        }
    };

    return (
        <div className="container">
            <AuthFormCard>
                <form onSubmit={handleSubmit}>
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
