import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function SessionDetailsScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Session Details {id}</Text>
        </View>
    );
}
