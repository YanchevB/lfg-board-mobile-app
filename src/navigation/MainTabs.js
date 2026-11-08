import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CatalogStack from './CatalogStack';
import MySessionsStack from './MySessionsStack';
import ProfileStack from './ProfileStack';
import Icon from '../components/Icon';
import { colors, fonts } from '../theme';

const Tab = createBottomTabNavigator();

const FORM_SCREENS = ['CreateSession', 'EditSession'];

export default function MainTabs() {
    const insets = useSafeAreaInsets();

    const tabBarStyle = {
        height: 56 + insets.bottom,
        backgroundColor: colors.surface,
        borderTopWidth: 1,
        borderTopColor: colors.border,
    };

    function stackTabOptions(route, title, icon) {
        const isForm = FORM_SCREENS.includes(getFocusedRouteNameFromRoute(route));

        return {
            title,
            tabBarIcon: ({ color }) => <Icon name={icon} size={24} color={color} />,
            tabBarStyle: isForm ? { display: 'none' } : tabBarStyle,
        };
    }

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.accent,
                tabBarInactiveTintColor: colors.muted,
                tabBarLabelStyle: { fontSize: 11, fontFamily: fonts.semibold, fontWeight: 'normal' },
            }}
        >
            <Tab.Screen name="CatalogTab" component={CatalogStack} options={({ route }) => stackTabOptions(route, 'Catalog', 'grid')} />
            <Tab.Screen name="MySessionsTab" component={MySessionsStack} options={({ route }) => stackTabOptions(route, 'My Sessions', 'gamepad')} />
            <Tab.Screen name="ProfileTab" component={ProfileStack} options={({ route }) => stackTabOptions(route, 'Profile', 'user')} />
        </Tab.Navigator>
    );
}
