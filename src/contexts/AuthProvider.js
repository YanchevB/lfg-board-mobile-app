import { useEffect, useState } from 'react';

import supabase from '../lib/supabase';
import AuthContext from './AuthContext';

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isAuthReady, setIsAuthReady] = useState(false);

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);

            if (event === 'INITIAL_SESSION') {
                setIsAuthReady(true);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const isAuthenticated = Boolean(user);

    return <AuthContext value={{ user, isAuthenticated, isAuthReady }}>{children}</AuthContext>;
}
