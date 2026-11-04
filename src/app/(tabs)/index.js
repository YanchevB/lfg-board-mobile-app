import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function CatalogScreen() {
    return (
        <View>
            <Text>Catalog</Text>

            {/* Temporary links until real cards and auth guards exist */}
            <Link href="/session/1">Session Details</Link>
            <Link href="/session/1/edit">Edit Session</Link>
            <Link href="/profile/1">Player Profile</Link>
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
        </View>
    );
}
