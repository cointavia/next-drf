import { apiRequest } from '@/services/utils/apiRequest';
import { clearSignUpEmail } from '@/services/utils/tokensServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {

  try {

    const response =  await apiRequest('/api/accounts/confirm-sign-up/', 'POST', req);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to confirm sign-up');
    }

    await clearSignUpEmail()

    return NextResponse.json({ message: 'User confirmed successfully' });

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error confirming sign-up:', error.message);
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      console.error('Unexpected error:', error);
      return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
  }
}
