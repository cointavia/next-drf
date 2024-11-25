'use server'


import { cookies } from 'next/headers'
import { NextResponse } from 'next/server';


// Clear tokens when logging out
export const clearTokens = async () => {
  const cookieStore = cookies();


  // cookieStore.delete('access_token');
  // cookieStore.delete('refresh_token');
  // cookieStore.delete('cognito_user_id');
  (await cookieStore).delete('access_token');
  (await cookieStore).delete('refresh_token');
  (await cookieStore).delete('cognito_user_id');
};
  
// Set tokens as secure, HTTP-only cookies
export const setTokens = async (res: NextResponse, accessToken: string, refreshToken: string) => {
    // cookies().set('access_token', accessToken, { httpOnly: true, secure: true, maxAge: 60 * 15, sameSite: 'lax' });
    // cookies().set('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' });
    (await cookies()).set('access_token', accessToken, { httpOnly: true, secure: true, maxAge: 60 * 15, sameSite: 'lax' });
    (await cookies()).set('refresh_token', refreshToken, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' })
  };


  export const setAccessTokens = async (accessToken: string) => {

    (await cookies()).set('access_token', accessToken, { httpOnly: true, secure: true, maxAge: 60 * 15, sameSite: 'lax' });
  
  };

  
  export const setSignUpEmail = async (signupEmail:string) => {


    (await cookies()).set('signup_email', signupEmail, { httpOnly: true, secure: true, maxAge: 60 * 60, sameSite: 'lax' });

    // cookies().set('signup_email', signupEmail, { httpOnly: true, secure: true, maxAge: 60 * 60, sameSite: 'lax' });
  
  };
  
  export const clearSignUpEmail = async () => {

    // cookies().delete('signup_email');
    (await cookies()).delete('signup_email');
  
  };

  export const getAccessToken = async (): Promise<string | undefined> => {
    try {
        const cookieStore = cookies();  // Access the server-side cookies
        // const accessToken = cookieStore.get('access_token')?.value;  // Extract the HTTP-only access token
        const accessToken = (await cookieStore).get('access_token')?.value;// Extract the HTTP-only access token
        if (!accessToken) {
            console.error("Access token not found in cookies");
            return undefined;
        }
        // console.log("Access token found:", accessToken);
        return accessToken;
    } catch (error) {
        console.error("Error retrieving access token:", error);
        return undefined;
    }
};