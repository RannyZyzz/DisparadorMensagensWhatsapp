import React from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native'; // Added Alert import
import { WebView } from 'react-native-webview';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { clearAllUsers } from '../utils/auth'; // Import the logout function
import { Ionicons } from '@expo/vector-icons'; // Import icons from Expo

// Define the root stack param list
type RootStackParamList = {
    Login: undefined;
    FirstAccess: undefined;
    Dashboard: { email: string };
};

// Define the navigation prop type for DashboardScreen
type DashboardScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;

// Define the route prop type for DashboardScreen
type DashboardScreenRouteProp = RouteProp<RootStackParamList, 'Dashboard'>;

// Define the props for DashboardScreen
type Props = {
    navigation: DashboardScreenNavigationProp;
    route: DashboardScreenRouteProp;
};

const DashboardScreen: React.FC<Props> = ({ navigation, route }) => {
    const { email } = route.params;

    // Handles the logout process
    const handleLogout = async () => {
        Alert.alert(
            'Sair',
            'Tem certeza que deseja sair?',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Sair',
                    onPress: async () => {
                        // await clearAllUsers(); // Clear user data from local storage
                        navigation.replace('Login'); // Navigate back to Login screen and clear navigation history
                    },
                },
            ],
            { cancelable: false }
        );
    };

    const { width, height } = Dimensions.get('window');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Bem-vindo, {email}!</Text>
                <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
                    <Ionicons name="log-out-outline" size={24} color="#fff" />
                    <Text style={styles.logoutButtonText}>Sair</Text>
                </TouchableOpacity>
            </View>

            <WebView
                style={styles.webview}
                source={{ uri: 'https://n8n.rannyzyzz.com.br/webhook/f0cea945-1b5c-4e26-b53f-2fdd955a11f6' }} // Corrected URL format
                onLoadStart={() => console.log('Carregando WebView...')}
                onLoadEnd={() => console.log('WebView carregada.')}
                onError={(syntheticEvent) => {
                    const { nativeEvent } = syntheticEvent;
                    console.warn('Erro na WebView: ', nativeEvent.description);
                    Alert.alert('Erro de Carregamento', 'Não foi possível carregar o conteúdo da web. Verifique sua conexão ou tente novamente mais tarde.');
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        paddingTop: 40, // Adjust for status bar
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#007bff', // Header background color
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#dc3545', // Red for logout
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 5,
    },
    webview: {
        flex: 1,
        marginTop: 10,
        borderRadius: 10,
        overflow: 'hidden', // Ensures the border radius is applied
        marginHorizontal: 10, // Add horizontal margin for a better look
        borderColor: '#ddd',
        borderWidth: 1,
    },
});

export default DashboardScreen;