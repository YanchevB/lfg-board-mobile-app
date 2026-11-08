import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RegisterScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Text>Register</Text>
            <Button title="Already have an account? Log in" onPress={() => navigation.goBack()} />
        </SafeAreaView>
    );
}
