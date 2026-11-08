import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AuthStack from './navigation/AuthStack';
import MainTabs from './navigation/MainTabs';

// Temporary until AuthContext exists (Leg 2). Set to false to see Login/Register (AuthStack).
const isLoggedIn = true;

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            {isLoggedIn ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
