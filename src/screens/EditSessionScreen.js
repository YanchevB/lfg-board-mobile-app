import { useCallback, useEffect } from 'react';

import { getSession, updateSession } from '../api/sessions';
import ErrorState from '../components/ErrorState';
import LoadingState from '../components/LoadingState';
import MessageState from '../components/MessageState';
import SessionForm from '../components/SessionForm';
import useAuth from '../hooks/useAuth';
import useFetch from '../hooks/useFetch';

export default function EditSessionScreen({ navigation, route }) {
    const { id } = route.params;
    const { user } = useAuth();

    const fetchSession = useCallback(() => getSession(id), [id]);
    const { data: session, error, isLoading, isRefreshing, refresh } = useFetch(fetchSession);

    const isOwner = session?.owner_id === user.id;

    // Only the host can edit, anyone else goes back to Details
    useEffect(() => {
        if (session && !isOwner) navigation.goBack();
    }, [session, isOwner, navigation]);

    async function save(values) {
        await updateSession(id, values);

        navigation.popTo('SessionDetails', { id, savedAt: Date.now() });
    }

    if (isLoading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState title="Couldn't load this session" isRefreshing={isRefreshing} onRetry={refresh} />;
    }

    if (!session) {
        return <MessageState message="This session doesn't exist anymore." />;
    }

    if (!isOwner) {
        return null;
    }

    return (
        <SessionForm
            initialValues={{ ...session, description: session.description ?? '' }}
            joinedCount={session.players.length}
            submitLabel="Save changes"
            submittingLabel="Saving…"
            onSubmit={save}
        />
    );
}
