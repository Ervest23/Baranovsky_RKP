import { loginUser, logout, clearError } from './slices/Auth';

export const loginWithDemo = (demoUsername) => (dispatch) => {
    const demoAccounts = {
        slava: '1111',
        ilya: '1111', 
        maxim: '1111',
        artur: '1111'
    };
    
    const password = demoAccounts[demoUsername];
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