import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import AuthTab from './navigation/AuthTab';
import MainTabs from './navigation/MainTabs';

// Temporary until AuthContext exists (Leg 2). Set to false to see Login/Register.
const isLoggedIn = true;

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar style="auto" />
            {isLoggedIn ? <MainTabs /> : <AuthTab />}
        </NavigationContainer>
    );
}
