import SessionForm from '../components/SessionForm';
import { getSession } from '../data/sampleData';

export default function EditSessionScreen({ navigation, route }) {
    const { id } = route.params;
    const session = getSession(id);

    // Saving comes with the Edit day (Thu Nov 19)
    return (
        <SessionForm
            initialValues={session}
            joinedCount={session.players.length}
            submitLabel="Save changes"
            onSubmit={() => navigation.goBack()}
        />
    );
}
