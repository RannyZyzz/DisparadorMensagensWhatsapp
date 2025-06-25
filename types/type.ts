export interface UserData {
    email: string;
    passwordHash: string; // Storing hashed password for security
    tempCode?: string; // Temporary code for first access/password reset
}