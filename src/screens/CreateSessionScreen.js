import { createSession } from '../api/sessions';
import SessionForm from '../components/SessionForm';

const EMPTY_SESSION = { game: '', platform: 'PC', slots: 4, mic_required: true, description: '' };

export default function CreateSessionScreen({ navigation }) {
    async function create(values) {
        const id = await createSession(values);

        navigation.replace('SessionDetails', { id });
    }

    return (
        <SessionForm
            initialValues={EMPTY_SESSION}
            submitLabel="Host session"
            submittingLabel="Hosting…"
            onSubmit={create}
        />
    );
}
