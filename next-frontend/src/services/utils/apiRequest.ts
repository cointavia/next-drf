// src/services/utils/apiRequest.ts
import { NextResponse, NextRequest } from 'next/server';
import { getApiKey } from './apiKeyChecker';
import { getAccessToken } from './tokensServer';

export async function apiRequest(endpoint: string, method: string,  body?: Record<string, unknown>  | NextRequest) {
    try {
        const apiKey = getApiKey();
        const accessToken = await getAccessToken();
        
        if (!accessToken) {
            return NextResponse.json({ error: "Access token is missing" }, { status: 401 });
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
                'Authorization': `Bearer ${accessToken}`,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            return handleError(response);
            // console.log(response)
            // return NextResponse.json({ error: `Failed to ${method} data` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return handleError(error);
        // console.error(`Error during ${method} request to ${endpoint}:`, error);
        // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}




export async function openApiRequest(endpoint: string, method: string,  body?: Record<string, unknown>  | NextRequest) {
    try {
        const apiKey = getApiKey();
        
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': apiKey,
            },
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            return handleError(response);
            // console.log(response)
            // return NextResponse.json({ error: `Failed to ${method} data` }, { status: response.status });
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error) {
        return handleError(error);
        // console.error(`Error during ${method} request to ${endpoint}:`, error);
        // return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function nextApi<T = Record<string, unknown>>(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
    body?: Record<string, unknown> | NextRequest
): Promise<T> { // Return the generic type T
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const response = await fetch(endpoint, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'API request failed');
        }

        return await response.json() as T; // Return JSON response and cast it to the generic type T
    } catch (error) {
        console.error('API request error:', error);
        throw error; // Re-throw error to handle it in the calling function
    }
}

  




// Centralized error handling
function handleError(error: unknown) {
    console.error("API Request Failed:", error);

    if (error instanceof Response) {
        // Handle specific response errors
        switch (error.status) {
            case 400:
                return NextResponse.json({ error: "Bad Request" }, { status: 400 });
            case 401:
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            case 403:
                return NextResponse.json({ error: "Forbidden" }, { status: 403 });
            case 404:
                return NextResponse.json({ error: "Not Found" }, { status: 404 });
            default:
                return NextResponse.json({ error: "Something went wrong" }, { status: error.status });
        }
    } else {
        // Handle generic errors
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}




