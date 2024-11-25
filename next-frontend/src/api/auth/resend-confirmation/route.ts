// src/app/api/auth/resend-confirmation/route.ts
import { openApiRequest } from '@/services/utils/apiRequest';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // const { email } = await req.json();

  try {

    const response =  await openApiRequest('/api/accounts/resend-confirmation/', 'POST', req);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to resend confirmation code');
    }

    return NextResponse.json({ message: 'Confirmation code resent successfully' });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
