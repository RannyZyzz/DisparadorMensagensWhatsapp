import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authenticateUser } from '../utils/auth';

// Define the root stack param list
type RootStackParamList = {
    Login: undefined;
    FirstAccess: undefined;
    Dashboard: { email: string };
};

// Define the navigation prop type for LoginScreen
type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

// Define the props for LoginScreen
type Props = {
    navigation: LoginScreenNavigationProp;
};

export const LoginScreen: React.FC<Props> = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Handles the login process
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            const isAuthenticated = await authenticateUser(email, password);
            if (isAuthenticated) {
                Alert.alert('Sucesso', 'Login realizado com sucesso!');
                // Navigate to Dashboard with user email
                navigation.navigate('Dashboard', { email });
            } else {
                Alert.alert('Erro', 'Email ou senha inválidos. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro no login:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login. Por favor, tente novamente.');
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={styles.container}>
                <Image
                    source={require('../assets/whatsapp-logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Disparador Whatsapp</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#000000"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    placeholderTextColor="#000000"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.secondaryButton}
                    onPress={() => navigation.navigate('FirstAccess')}
                >
                    <Text style={styles.secondaryButtonText}>Primeiro Acesso / Esqueceu a Senha?</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f7', // Light background color
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 40,
    },
    input: {
        width: width * 0.85, // Responsive width
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 18,
        borderColor: '#ddd',
        borderWidth: 1,
        color: '#000',
        fontWeight: 'bold'
    },
    button: {
        width: width * 0.85,
        padding: 15,
        backgroundColor: '#007bff', // Primary blue
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000', // Add shadow for depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    secondaryButton: {
        width: width * 0.85,
        padding: 15,
        alignItems: 'center',
    },
    secondaryButtonText: {
        color: '#007bff',
        fontSize: 16,
        textDecorationLine: 'underline',
    },
    logo: {
        width: 150,
        height: 150,
        marginBottom: 20,
    },
});