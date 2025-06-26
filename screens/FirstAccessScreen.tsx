import React, { useState } from 'react';
import { Image, Platform } from 'react-native';
import { KeyboardAvoidingView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { saveUser, getUserByEmail } from '../utils/auth';
import { UserData } from '../types/type';

// Define the root stack param list
type RootStackParamList = {
    Login: undefined;
    FirstAccess: undefined;
    Dashboard: { email: string };
};

// Define the navigation prop type for FirstAccessScreen
type FirstAccessScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FirstAccess'>;

// Define the route prop type for FirstAccessScreen (if it receives params)
type FirstAccessScreenRouteProp = RouteProp<RootStackParamList, 'FirstAccess'>;

// Define the props for FirstAccessScreen
type Props = {
    navigation: FirstAccessScreenNavigationProp;
    route: FirstAccessScreenRouteProp;
};

const FirstAccessScreen: React.FC<Props> = ({ navigation }) => {
    const [currentStep, setCurrentStep] = useState(1); // 1: Email, 2: Code, 3: Password
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [generatedCode, setGeneratedCode] = useState(''); // Simulated code

    // Handles sending the simulated code to the user's email (console/alert for now)
    const handleSendCode = async () => {
        if (!email) {
            Alert.alert('Erro', 'Por favor, informe seu email.');
            return;
        }

        try {
            // Simulate sending a code (e.g., a 4-digit number)
            const codeToSend = Math.floor(1000 + Math.random() * 9000).toString();
            setGeneratedCode(codeToSend); // Store it locally for validation

            // Store the tempCode with the user's email (or create a new user if not exists)
            await saveUser(email, 'undefined', codeToSend); // Pass undefined for password as we're only setting tempCode

            Alert.alert(
                'Código Enviado (Simulado)',
                `Um código de 4 dígitos foi 'enviado' para ${email}. Para fins de demonstração, o código é: ${codeToSend}. Por favor, insira este código na próxima tela.`
            );
            setCurrentStep(2); // Move to code validation step
        } catch (error) {
            console.error('Erro ao enviar código:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar o código. Por favor, tente novamente.');
        }
    };

    // Handles code validation
    const handleValidateCode = async () => {
        if (!code) {
            Alert.alert('Erro', 'Por favor, insira o código.');
            return;
        }

        try {
            const user = await getUserByEmail(email);
            if (user && user.tempCode === code) {
                Alert.alert('Sucesso', 'Código validado com sucesso! Agora você pode definir sua senha.');
                setCurrentStep(3); // Move to password setting step
            } else {
                Alert.alert('Erro', 'Código inválido ou expirado. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao validar código:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao validar o código. Por favor, tente novamente.');
        }
    };

    // Handles setting the new password
    const handleSetPassword = async () => {
        if (!newPassword || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos de senha.');
            return;
        }
        if (newPassword !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }
        if (newPassword.length < 6) {
            Alert.alert('Erro', 'A senha deve ter no mínimo 6 caracteres.');
            return;
        }

        try {
            // Save the new password and clear the temporary code
            await saveUser(email, newPassword, undefined); // Pass undefined for tempCode to clear it
            Alert.alert('Sucesso', 'Senha definida com sucesso! Você pode fazer login agora.');
            navigation.navigate('Login'); // Navigate back to login screen
        } catch (error) {
            console.error('Erro ao definir senha:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao definir a senha. Por favor, tente novamente.');
        }
    };

    const { width } = Dimensions.get('window');

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <View style={styles.container}>
                {currentStep === 1 && (
                    <>
                        <Image
                            source={require('../assets/email-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Informe seu Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Seu email"
                            placeholderTextColor="#000000"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
                            <Text style={styles.buttonText}>Enviar Código</Text>
                        </TouchableOpacity>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <Image
                            source={require('../assets/cadeado-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Validar Código</Text>
                        <Text style={styles.subtitle}>
                            Um código foi enviado (simulado) para {email}. Por favor, insira-o abaixo.
                        </Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Código"
                            placeholderTextColor="#000000"
                            value={code}
                            onChangeText={setCode}
                            keyboardType="numeric"
                            maxLength={4}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleValidateCode}>
                            <Text style={styles.buttonText}>Validar Código</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => setCurrentStep(1)}
                        >
                            <Text style={styles.secondaryButtonText}>Voltar</Text>
                        </TouchableOpacity>
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <Image
                            source={require('../assets/password-logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                        <Text style={styles.title}>Definir Nova Senha</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Nova Senha"
                            placeholderTextColor="#000000"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirmar Nova Senha"
                            placeholderTextColor="#000000"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={true}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
                            <Text style={styles.buttonText}>Definir Senha</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.secondaryButton}
                            onPress={() => setCurrentStep(1)}
                        >
                            <Text style={styles.secondaryButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </>
                )}
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
        backgroundColor: '#f0f4f7',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    input: {
        width: width * 0.85,
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
        backgroundColor: '#007bff',
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
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

export default FirstAccessScreen;