import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AuthFormCard from "../components/AuthFormCard.jsx";
import InputField from "../components/InputField.jsx";
import axiosInstance from "../../../shared/config/axios.js";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle.js";
import {
    registerFailure,
    registerSuccess, resetFormState,
    setConfirmPassword,
    setEmail,
    setName,
    setPassword
} from "../../../shared/redux/actions/authActions.js";

function RegisterPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, confirmPassword, name, error, isAuthenticated } = useSelector(state => state.auth);

    useDocumentTitle('Register');

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

        // Réinitialiser uniquement les champs du formulaire, pas l'état d'authentification
        dispatch(resetFormState());
    }, [isAuthenticated, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            dispatch(registerFailure("Les mots de passe ne correspondent pas."));
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
            dispatch(registerSuccess(response.data.token));
            navigate('/');
        } catch (error) {
            console.error("Erreur lors de l'inscription", error.response?.data);
            dispatch(registerFailure("Erreur lors de l'inscription"));
        }
    };

    return (
        <main className="container min-vh-100">
            <AuthFormCard>
                <form onSubmit={handleSubmit}>
                    <h3 className="my-2">Créez un compte</h3>

                    <div className="">
                        {error && <p className="text-danger">{error}</p>}
                    </div>

                    <InputField
                        label="Nom"
                        id="name"
                        type="text"
                        value={name || ""}
                        onChange={(e) => dispatch(setName(e.target.value))}
                        autoComplete="name"
                    />

                    <InputField
                        label="Adresse Mail"
                        id="email"
                        type="email"
                        value={email || ""}
                        onChange={(e) => dispatch(setEmail(e.target.value))}
                        autoComplete="username"
                    />

                    <InputField
                        label="Mot de passe"
                        id="password"
                        type="password"
                        value={password || ""}
                        onChange={(e) => dispatch(setPassword(e.target.value))}
                        autoComplete="new-password"
                    />

                    <InputField
                        label="Confirmer le mot de passe"
                        id="confirmPassword"
                        type="password"
                        value={confirmPassword || ""}
                        onChange={(e) => dispatch(setConfirmPassword(e.target.value))}
                        autoComplete="new-password"
                    />

                    <button type="submit" className="btn btn-primary py-3 w-100">S'inscrire</button>
                    <p className="text-center mt-3">Vous avez déjà un compte ? <Link
                        to="/auth/login">Connectez-vous</Link></p>
                </form>
            </AuthFormCard>
        </main>
    );
}

export default RegisterPage;
