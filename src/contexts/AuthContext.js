import { createContext } from 'react';

const AuthContext = createContext({
    user: null,
    isAuthenticated: false,
    isAuthReady: false,
});

export default AuthContext;
