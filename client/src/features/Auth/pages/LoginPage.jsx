import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import AuthFormCard from "../components/AuthFormCard.jsx";
import InputField from "../components/InputField.jsx";
import axiosInstance from "../../../shared/config/axios.js";
import useDocumentTitle from "../../../shared/hooks/useDocumentTitle.js";
import {
    loginFailure,
    loginSuccess,
    resetFormState,
    setEmail,
    setPassword
} from "../../../shared/redux/actions/authActions.js";

function LoginPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {email, password, error, isAuthenticated} = useSelector(state => state.auth);

    useDocumentTitle('Login');

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }

        // Réinitialiser uniquement les champs du formulaire, pas l'état d'authentification
        dispatch(resetFormState());
    }, [isAuthenticated, navigate, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post('/login', {email, password});
            localStorage.setItem("token", response.data.token);
            dispatch(loginSuccess(response.data.token));
            navigate("/");
        } catch (error) {
            console.error("Erreur lors de la connexion", error.response?.data);
            dispatch(loginFailure("Adresse email ou mot de passe incorrect"));
        }
    };

    return (
        <main className="container min-vh-100">
            <AuthFormCard>
                <form onSubmit={handleSubmit}>
                    <h3 className="my-2">Connectez-vous</h3>

                    <div className="">
                        {error && <p className="text-danger">{error}</p>}
                    </div>

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
                        autoComplete="current-password"
                    />

                    <button type="submit" className="btn btn-primary py-3 w-100">Connexion</button>
                    <p className='text-center mt-3'>Vous êtes nouveau ? <Link to='/auth/register'>Inscrivez-vous</Link>
                    </p>
                </form>
            </AuthFormCard>
        </main>
    );
}

export default LoginPage;
