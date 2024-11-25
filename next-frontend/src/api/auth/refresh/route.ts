import { NextRequest, NextResponse } from 'next/server';
import { setAccessTokens } from '../../../../services/utils/tokensServer';
import { openApiRequest } from '@/services/utils/apiRequest';

export async function POST(req: NextRequest) {
  // Extract the refresh token from the cookies
  const refreshToken = req.cookies.get('refresh_token')?.value;

  if (!refreshToken) {
    return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
  }

  try {
    const username = req.cookies.get('cognito_user_id')?.value;

    const reqBody=  { refresh_token: refreshToken, username: username };

    const response =  await openApiRequest('/api/accounts/refresh/', 'POST', reqBody);


    if (!response.ok) {
      throw new Error('Failed to refresh tokens');
    }

    const { access_token} = await response.json();

    // Set the new tokens in cookies (HTTP-only, secure cookies)
    const res = NextResponse.json({ success: true });
    await setAccessTokens(access_token); // Set new tokens as HTTP-only cookies

    return res;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Token refresh failed' }, { status: 500 });
  }
}
