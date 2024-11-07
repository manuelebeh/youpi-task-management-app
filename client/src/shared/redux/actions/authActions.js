export const setName = (name) => ({
    type: 'SET_NAME',
    payload: name,
});

export const setEmail = (email) => ({
    type: 'SET_EMAIL',
    payload: email,
});

export const setPassword = (password) => ({
    type: 'SET_PASSWORD',
    payload: password,
});

export const setConfirmPassword = (confirmPassword) => ({
    type: 'SET_CONFIRM_PASSWORD',
    payload: confirmPassword,
});

export const loginSuccess = (token) => ({
    type: 'LOGIN_SUCCESS',
    payload: token,
});

export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: error,
});

export const registerSuccess = (token) => ({
    type: 'REGISTER_SUCCESS',
    payload: token,
});

export const registerFailure = (error) => ({
    type: 'REGISTER_FAILURE',
    payload: error,
});

export const logout = () => ({
    type: 'LOGOUT',
});

export const resetFormState = () => ({
    type: 'RESET_FORM_STATE'
});