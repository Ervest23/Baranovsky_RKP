import { loginUser, logout, clearError, accounts } from './slices/Auth';

export const loginWithDemo = (demoUsername) => (dispatch) => {
    const password = accounts[demoUsername];
    if (password) {
        dispatch(loginUser({ username: demoUsername, password }));
    }
};

export const checkAuthTimeout = (timeout) => (dispatch) => {
    setTimeout(() => {
        dispatch(logout());
    }, timeout);
};

export { loginUser, logout, clearError };