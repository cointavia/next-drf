'use server';

import { jwtDecode } from 'jwt-decode';


export const refreshTokens = async () => {
  try {
    const response = await fetch('/api/auth/refresh', {
      method: 'POST',
      credentials: 'include',  // Ensure cookies are included in the request
    });

    if (!response.ok) {
      throw new Error('Failed to refresh tokens');
    }

    return await response.json();
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    throw error;
  }
};


// Define the type for the decoded token payload
interface TokenPayload {
  exp: number;  // Expiration time of the token
}

// Check if the access token is expired
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: TokenPayload = jwtDecode(token);  // Decode the token
    const currentTime = Date.now() / 1000;  // Convert current time to seconds

    return decoded.exp < currentTime;  // Return true if the token is expired
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;  // If token can't be decoded, treat it as expired
  }
};