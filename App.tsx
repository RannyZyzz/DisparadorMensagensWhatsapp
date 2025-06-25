import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginScreen } from './screens/LoginScreen';
import FirstAccessScreen from './screens/FirstAccessScreen';
import DashboardScreen from './screens/DashboardScreen';
import { UserData } from './types/type'; // Import UserData type

const Stack = createStackNavigator();

export default function App() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Checks if a user is already logged in or registered to determine the initial route
  useEffect(() => {
    const checkUserStatus = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
          const userData: UserData = JSON.parse(userDataString);
          // Assuming if there's any user data, we can start at the login or directly dashboard if token based.
          // For this app, we always start at Login to demonstrate the flow.
          setInitialRoute('Login');
        } else {
          setInitialRoute('Login');
        }
      } catch (e) {
        console.error('Erro ao verificar o status do usuário:', e);
        setInitialRoute('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkUserStatus();
  }, []);

  if (isLoading) {
    return null; // Or a loading spinner
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute || 'Login'}>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }} // Hide header for a cleaner look
        />
        <Stack.Screen
          name="FirstAccess"
          component={FirstAccessScreen}
          options={{ title: 'Primeiro Acesso / Recuperar Senha' }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }} // Hide header for Dashboard
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}