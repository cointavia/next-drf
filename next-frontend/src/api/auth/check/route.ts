import { NextRequest, NextResponse } from 'next/server';
import { openApiRequest } from '@/services/utils/apiRequest';
import { setAccessTokens } from '../../../../services/utils/tokensServer';


export async function GET(req: NextRequest) {
  // Extract the access token from the cookies
  const accessToken = req.cookies.get('access_token')?.value;
  const refreshToken = req.cookies.get('refresh_token')?.value;
  const username = req.cookies.get('cognito_user_id')?.value;

  if (!accessToken && !refreshToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {

    if (accessToken) {
      // Send a request to the Lambda function to verify the token
      const response = await fetch(`${process.env.LAMBDA_AUTH_URL}`, {
        method: 'POST', // Use POST or GET depending on your Lambda API setup
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,  // Pass the token to the Lambda function
          'X-API-KEY': `${process.env.LAMBDA_AUTH_API_KEY}`
        },
      });

      if (response.status == 200) {
        // Token is invalid or expired, respond with 401 Unauthorized
        return NextResponse.json({ success: true });
      }
   }
    
    if (refreshToken) {
      const reqBody=  { refresh_token: refreshToken, username: username };

      const refreshResponse =  await openApiRequest('/api/accounts/refresh/', 'POST', reqBody);

      if (refreshResponse.ok) {
        const { access_token} = await refreshResponse.json();

        // Set the new tokens in cookies (HTTP-only, secure cookies)
        await setAccessTokens(access_token);  // Set new tokens as HTTP-only cookies
        return NextResponse.json({ success: true });
      }
    }

    // Token is valid, return success
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch (error) {
    console.error('Error validating token with Lambda:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
