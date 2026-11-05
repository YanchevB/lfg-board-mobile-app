import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CatalogStack from './CatalogStack';
import MySessionsStack from './MySessionsStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="CatalogTab" component={CatalogStack} options={{ title: 'Catalog' }} />
            <Tab.Screen name="MySessionsTab" component={MySessionsStack} options={{ title: 'My Sessions' }} />
            <Tab.Screen name="ProfileTab" component={ProfileStack} options={{ title: 'Profile' }} />
        </Tab.Navigator>
    );
}
