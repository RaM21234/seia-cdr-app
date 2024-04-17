// src/utils/storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a type for your token for better type checking
type Token = string | null;

// Function to store the token
export const storeToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    // Error saving data
    console.error('Failed to save the token to storage', error);
  }
};

// Function to retrieve the token
export const getToken = async (): Promise<Token> => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    return token;
  } catch (error) {
    // Error retrieving data
    console.error('Failed to fetch the token from storage', error);
    return null;
  }
};

// Optionally, you can also create a function to clear the token
export const removeToken = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('authToken');
  } catch (error) {
    console.error('Failed to remove the token from storage', error);
  }
};
