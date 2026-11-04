import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function EditSessionScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Edit Session {id}</Text>
        </View>
    );
}
