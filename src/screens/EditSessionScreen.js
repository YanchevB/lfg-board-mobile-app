import { Text, View } from 'react-native';

export default function EditSessionScreen({ route }) {
    const { id } = route.params;

    return (
        <View>
            <Text>Edit Session {id}</Text>
        </View>
    );
}
