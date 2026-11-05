import { Text, View } from 'react-native';

export default function PlayerProfileScreen({ route }) {
    const { id } = route.params;

    return (
        <View>
            <Text>Player Profile {id}</Text>
        </View>
    );
}
