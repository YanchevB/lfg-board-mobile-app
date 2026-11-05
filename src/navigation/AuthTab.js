import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Tab = createBottomTabNavigator();

export default function AuthTab() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="Register" component={RegisterScreen} />
        </Tab.Navigator>
    );
}
