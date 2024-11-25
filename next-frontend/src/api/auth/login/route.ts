import { NextResponse } from 'next/server';
import { setTokens } from '../../../../services/utils/tokensServer';
import { openApiRequest } from '@/services/utils/apiRequest';


export async function POST(request: Request) {
  const body = await request.json();
  const response =  await openApiRequest('/api/accounts/sign-in/', 'POST', body);

      if (!response.ok) {
        return NextResponse.json({ message: 'Login failed' }, { status: response.status });
      }

      const { cognito_user_id, access_token, refresh_token  } = await response.json();
      const res = NextResponse.json({ success: true });
      res.cookies.set('cognito_user_id', cognito_user_id, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7, sameSite: 'lax' });

      await setTokens(res,access_token, refresh_token);
    
      return res
}

