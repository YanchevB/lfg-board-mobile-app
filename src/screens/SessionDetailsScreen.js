import { Text, View } from 'react-native';

export default function SessionDetailsScreen({ route }) {
    const { id } = route.params;

    return (
        <View>
            <Text>Session Details {id}</Text>
        </View>
    );
}
