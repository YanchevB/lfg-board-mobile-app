import { useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function PlayerProfileScreen() {
    const { id } = useLocalSearchParams();

    return (
        <View>
            <Text>Player Profile {id}</Text>
        </View>
    );
}
