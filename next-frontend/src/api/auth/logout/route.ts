import {  NextResponse } from 'next/server';
import { clearTokens } from '../../../../services/utils/tokensServer';
import { apiRequest } from '@/services/utils/apiRequest';


export async function GET() {

  try {

    const response =  await apiRequest('/api/accounts/logout/', 'POST');

    if (!response.ok) {
      throw new Error('Failed to log out from the backend');
    }

    if (response.ok) {
        await clearTokens();  
  
        // Get the absolute URL for the home page (index)
        // const absoluteUrl = new URL('/', req.nextUrl.origin);
  
        // Redirect to the home page (index page)
        // return NextResponse.redirect(absoluteUrl.toString(), {
        //   status: 302,  // Set the redirect status code
        // });
        return NextResponse.json({ success: true });
      } else {
        throw new Error('Failed to log out from the backend');
      }

  } catch (error) {
    console.error('Error during logout:', error);
    return NextResponse.json({ error: 'Failed to log out' }, { status: 500 });
  }
}
