import SessionForm from '../components/SessionForm';

const EMPTY_SESSION = { game: '', platform: 'PC', slots: 4, mic_required: true, description: '' };

export default function CreateSessionScreen({ navigation }) {
    // Saving comes with the Create day (Tue Nov 17)
    return <SessionForm initialValues={EMPTY_SESSION} submitLabel="Host session" onSubmit={() => navigation.goBack()} />;
}
