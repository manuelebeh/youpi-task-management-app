import pageNotFoundImg from "../assets/images/humaaans/404-computer.svg";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
    const navigate = useNavigate();

    return (
        <section className="container d-flex vh-100 align-items-center justify-content-center">
            <div className="text-center">
                <img src={pageNotFoundImg} alt="Page not found image" className="img-fluid mb-4" />

                <h3 className="text-primary">404 Not Found</h3>
                <h2>Whoops! That page doesn’t exist.</h2>

                <button
                    onClick={() => navigate(-1)}
                    className="btn btn-primary mt-4 px-5 py-3"
                >
                    Go Back
                </button>
            </div>
        </section>
    );
}