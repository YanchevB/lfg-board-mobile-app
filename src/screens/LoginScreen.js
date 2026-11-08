import { Button, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen({ navigation }) {
    return (
        <SafeAreaView>
            <Text>Login</Text>
            <Button title="No account yet? Create one" onPress={() => navigation.navigate('Register')} />
        </SafeAreaView>
    );
}
