import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MySessionsScreen from '../screens/MySessionsScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import CreateSessionScreen from '../screens/CreateSessionScreen';
import EditSessionScreen from '../screens/EditSessionScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';
import { stackScreenOptions } from '../components/AppHeader';

const Stack = createNativeStackNavigator();

export default function MySessionsStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen name="MySessions" component={MySessionsScreen} options={{ headerShown: false, title: 'My Sessions' }} />
            <Stack.Screen name="CreateSession" component={CreateSessionScreen} options={{ presentation: 'modal', title: 'Host a session' }} />
            <Stack.Screen name="SessionDetails" component={SessionDetailsScreen} options={{ title: 'Session', headerBackTitle: 'Back' }} />
            <Stack.Screen name="EditSession" component={EditSessionScreen} options={{ title: 'Edit session' }} />
            <Stack.Screen name="PlayerProfile" component={PlayerProfileScreen} options={{ title: 'Player' }} />
        </Stack.Navigator>
    );
}
