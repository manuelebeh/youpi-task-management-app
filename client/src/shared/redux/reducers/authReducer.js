const initialState = {
    token: localStorage.getItem('token') || null,
    error: null,
    isAuthenticated: !!localStorage.getItem('token'), // Initialisation basée sur le token
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_FORM_STATE':
            return {
                ...state,
                email: '',
                password: '',
                confirmPassword: '',
                name: '',
                error: '',
            };
        case 'SET_NAME':
            return {...state, name: action.payload};
        case 'SET_EMAIL':
            return {...state, email: action.payload};
        case 'SET_PASSWORD':
            return {...state, password: action.payload};
        case 'SET_CONFIRM_PASSWORD':
            return {...state, confirmPassword: action.payload};
        case 'LOGIN_SUCCESS':
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                token: action.payload,
                isAuthenticated: true,
                error: null,
            };
        case 'LOGIN_FAILURE':
        case 'REGISTER_FAILURE':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                error: action.payload,
            };
        case 'LOGOUT':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
};

export default authReducer