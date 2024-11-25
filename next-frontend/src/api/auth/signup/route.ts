import { NextRequest, NextResponse } from 'next/server';
import { setSignUpEmail } from '@/services/utils/tokensServer';
import { openApiRequest } from '@/services/utils/apiRequest';

export async function POST(req: NextRequest) {
  const {email } = await req.json();
  // const body= JSON.stringify({ first_name, last_name, email, password })

  try {
    
    const response =  await openApiRequest('/api/accounts/sign-up/', 'POST', req);

    if (!response.ok) {
      return NextResponse.json({ message: 'Signup failed' }, { status: response.status });
    }

    const data = await response.json();
    
    // const res = NextResponse.json({ message: 'Signup successful' });

    await setSignUpEmail(email);

    return NextResponse.json({ success: true, data, email : email });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
