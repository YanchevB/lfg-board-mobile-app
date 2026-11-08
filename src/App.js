import { useEffect } from 'react';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthStack from './navigation/AuthStack';
import MainTabs from './navigation/MainTabs';
import { navigationTheme } from './theme';

SplashScreen.preventAutoHideAsync();

// Temporary until AuthContext exists (Leg 2). Set to false to see Login/Register (AuthStack).
const isLoggedIn = true;

export default function App() {
    const [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
    });

    useEffect(() => {
        if (fontsLoaded || fontError) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <NavigationContainer theme={navigationTheme}>
                <StatusBar style="light" />
                {isLoggedIn ? <MainTabs /> : <AuthStack />}
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
