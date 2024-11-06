import PropTypes from "prop-types";

export default function InputField({ label, id, type = "text", value, onChange, autoComplete }) {
    return (
        <div className="p-0 mb-4">
            <label className="form-label" htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                name={id}
                className="form-control"
                value={value}
                onChange={onChange}
                autoComplete={autoComplete}
            />
        </div>
    );
}

InputField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    autoComplete: PropTypes.string
};