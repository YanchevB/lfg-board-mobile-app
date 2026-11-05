import { Button, Text, View } from 'react-native';

export default function MySessionsScreen({ navigation }) {
    return (
        <View>

            {/* Temporary button until real session cards exist */}
            <Button title="Session Details" onPress={() => navigation.navigate('SessionDetails', { id: '2' })} />
        </View>
    );
}
