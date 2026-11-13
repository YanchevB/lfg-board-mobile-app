import { useEffect } from 'react';
import { Inter_400Regular, Inter_600SemiBold, Inter_700Bold, Inter_800ExtraBold, useFonts } from '@expo-google-fonts/inter';
import { NavigationContainer } from '@react-navigation/native';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AuthProvider from './contexts/AuthProvider';
import useAuth from './hooks/useAuth';
import AuthStack from './navigation/AuthStack';
import MainTabs from './navigation/MainTabs';
import { navigationTheme } from './theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
    return (
        <AuthProvider>
            <SafeAreaProvider>
                <Root />
            </SafeAreaProvider>
        </AuthProvider>
    );
}

// Separate from App because useAuth only works inside AuthProvider
function Root() {
    const { isAuthenticated, isAuthReady } = useAuth();
    const [fontsLoaded, fontError] = useFonts({
        Inter_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Inter_800ExtraBold,
    });

    // The splash screen stays up until the fonts are loaded and the stored session is read
    const isReady = (fontsLoaded || Boolean(fontError)) && isAuthReady;

    useEffect(() => {
        if (isReady) {
            SplashScreen.hideAsync();
        }
    }, [isReady]);

    if (!isReady) {
        return null;
    }

    return (
        <NavigationContainer theme={navigationTheme}>
            <StatusBar style="light" />
            {isAuthenticated ? <MainTabs /> : <AuthStack />}
        </NavigationContainer>
    );
}
