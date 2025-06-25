import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserData } from '../types/type';

// Simple function to simulate password hashing (DO NOT USE IN PRODUCTION)
const hashPassword = (password: string): string => {
    // In a real app, use a strong hashing library like bcrypt
    return password + '_hashed';
};

// Simple function to simulate password verification
const verifyPassword = (password: string, hashedPasswordFromStorage: string): boolean => {
    return hashPassword(password) === hashedPasswordFromStorage;
};

// Saves or updates user data in local storage
export const saveUser = async (email: string, password?: string, tempCode?: string): Promise<void> => {
    try {
        const existingUserDataString = await AsyncStorage.getItem('userData');
        let users: { [key: string]: UserData } = existingUserDataString ? JSON.parse(existingUserDataString) : {};

        if (users[email]) {
            // Update existing user
            if (password) {
                users[email].passwordHash = hashPassword(password);
            }
            if (tempCode) {
                users[email].tempCode = tempCode;
            } else {
                delete users[email].tempCode; // Clear tempCode if not provided
            }
        } else {
            // Create new user
            if (!password) {
                throw new Error('A senha é obrigatória para um novo usuário.');
            }
            users[email] = { email, passwordHash: hashPassword(password) };
            if (tempCode) {
                users[email].tempCode = tempCode;
            }
        }

        await AsyncStorage.setItem('userData', JSON.stringify(users));
        console.log('Dados do usuário salvos/atualizados:', email);
    } catch (error) {
        console.error('Erro ao salvar usuário:', error);
        throw error;
    }
};

// Retrieves user data by email
export const getUserByEmail = async (email: string): Promise<UserData | null> => {
    try {
        const userDataString = await AsyncStorage.getItem('userData');
        if (userDataString) {
            const users: { [key: string]: UserData } = JSON.parse(userDataString);
            return users[email] || null;
        }
        return null;
    } catch (error) {
        console.error('Erro ao buscar usuário por email:', error);
        return null;
    }
};

// Authenticates user with email and password
export const authenticateUser = async (email: string, password: string): Promise<boolean> => {
    try {
        const user = await getUserByEmail(email);
        if (user && user.passwordHash) {
            return verifyPassword(password, user.passwordHash);
        }
        return false;
    } catch (error) {
        console.error('Erro ao autenticar usuário:', error);
        return false;
    }
};

// Clears all user data (for logout)
export const clearAllUsers = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('userData');
        console.log('Todos os dados do usuário limpos.');
    } catch (error) {
        console.error('Erro ao limpar todos os usuários:', error);
    }
};