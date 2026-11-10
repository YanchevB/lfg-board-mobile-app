// TEMPORARY stand-in until AuthContext exists (Leg 2).
// Replace the body with `return useContext(AuthContext);` and keep the same shape.
export default function useAuth() {
    return { user: null, isAuthenticated: false, isAuthReady: true };
}
