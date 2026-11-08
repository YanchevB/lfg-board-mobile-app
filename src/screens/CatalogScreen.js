import { Button, Text, View } from 'react-native';

export default function CatalogScreen({ navigation }) {
    return (
        <View>

            {/* Host button: opens the Create form as a modal */}
            <Button title="Host" onPress={() => navigation.navigate('CreateSession')} />

            {/* Temporary buttons until real session cards exist */}
            <Button title="Session Details" onPress={() => navigation.navigate('SessionDetails', { id: '1' })} />
            <Button title="Edit Session" onPress={() => navigation.navigate('EditSession', { id: '1' })} />
            <Button title="Player Profile" onPress={() => navigation.navigate('PlayerProfile', { id: '1' })} />
        </View>
    );
}
