import PropTypes from "prop-types";

export default function AuthFormCard({children}) {
    return (
        <div className="row align-items-center justify-content-center vh-100">
            <div className="col-lg-5 mb-5 mb-lg-0">
                <div className="card">
                    <div className="card-body py-5 px-md-5">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}

AuthFormCard.propTypes = {
    children: PropTypes.node.isRequired
};