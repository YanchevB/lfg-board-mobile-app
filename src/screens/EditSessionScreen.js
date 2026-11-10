import { useCallback } from 'react';

import { getSession } from '../api/sessions';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import SessionForm from '../components/SessionForm';
import useFetch from '../hooks/useFetch';

export default function EditSessionScreen({ navigation, route }) {
    const { id } = route.params;

    const fetchSession = useCallback(() => getSession(id), [id]);
    const { data: session, error, isLoading, isRefreshing, refresh } = useFetch(fetchSession);

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState title="Couldn't load this session" isRefreshing={isRefreshing} onRetry={refresh} />;
    }

    if (!session) {
        return <MessageState message="This session doesn't exist anymore." />;
    }

    // Saving and the owner-only redirect come with the Edit day (Thu Nov 19)
    return (
        <SessionForm
            initialValues={{ ...session, description: session.description ?? '' }}
            joinedCount={session.players.length}
            submitLabel="Save changes"
            onSubmit={() => navigation.goBack()}
        />
    );
}
