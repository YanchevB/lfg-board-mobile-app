import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CatalogScreen from '../screens/CatalogScreen';
import SessionDetailsScreen from '../screens/SessionDetailsScreen';
import EditSessionScreen from '../screens/EditSessionScreen';
import PlayerProfileScreen from '../screens/PlayerProfileScreen';

const Stack = createNativeStackNavigator();

export default function CatalogStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Catalog" component={CatalogScreen} />
            <Stack.Screen name="SessionDetails" component={SessionDetailsScreen} options={{ title: 'Session' }} />
            <Stack.Screen name="EditSession" component={EditSessionScreen} options={{ title: 'Edit Session' }} />
            <Stack.Screen name="PlayerProfile" component={PlayerProfileScreen} options={{ title: 'Player' }} />
        </Stack.Navigator>
    );
}
