import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CatalogScreen from '../screens/CatalogScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import CreateSessionScreen from '../screens/CreateSessionScreen';
import EditSessionScreen from '../screens/EditSessionScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';
import { stackScreenOptions } from '../components/AppHeader';

const Stack = createNativeStackNavigator();

export default function CatalogStack() {
    return (
        <Stack.Navigator screenOptions={stackScreenOptions}>
            <Stack.Screen name="Catalog" component={CatalogScreen} options={{ headerShown: false, title: 'Sessions' }} />
            <Stack.Screen name="CreateSession" component={CreateSessionScreen} options={{ presentation: 'modal', title: 'Host a session' }} />
            <Stack.Screen name="SessionDetails" component={SessionDetailsScreen} options={{ title: 'Session' }} />
            <Stack.Screen name="EditSession" component={EditSessionScreen} options={{ title: 'Edit session' }} />
            <Stack.Screen name="PlayerProfile" component={PlayerProfileScreen} options={{ title: 'Player' }} />
        </Stack.Navigator>
    );
}
