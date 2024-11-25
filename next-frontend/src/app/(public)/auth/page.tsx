'use client'

import { useState, useEffect } from 'react';
import Input from '@/app/components/Input';
import Button from '@/app/components/Button2';
import { useRouter } from 'next/navigation'; 
import LoadingOverlay from '@/app/components/LoadingOverlay';

export default function AuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const toggleTab = () => setIsLogin(!isLogin);

  // State for login form
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // State for sign up form
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');

  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);


   // Redirect user to the protected view if already authenticated
   useEffect(() => {
    setIsLoading(true);
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/auth/check', {
          method: 'GET',
          credentials: 'include',  // Include cookies to check the token
        });
        debugger

        if (response.ok) {
          debugger
          // User is authenticated, redirect to protected page
          router.push('/dashboard');
          debugger
        }
      } catch (error) {
       
        // If the user is not authenticated, they remain on the auth page
        console.log('User not authenticated:', error);
      }finally{

        setIsLoading(false);
      }
      
    };
    checkAuthStatus();
    //
  }, [router]);

  // Handle login form submission
  const handleLoginSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    setError(null);  // Reset error before making a new request

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Login failed');
      }

      setMessage('Login successful');
      router.push('/dashboard');  // After successful login, redirect to protected view
      // Optionally, handle redirect or token-based action here
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
    } else {
        setError('An unknown error occurred');
    }
    }
  };

  // Handle signup form submission
  const handleSignupSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);  // Reset error before making a new request

    if (signupPassword !== signupPasswordConfirm) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: signupFirstName,
          last_name: signupLastName,
          email: signupEmail,
          password: signupPassword,
        }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || 'Signup failed');
      }

      setMessage('Signup successful');
      router.push('/auth/confirm');
      // Optionally, handle redirect or token-based action here
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
          setError('An unknown error occurred');
      }
    }
  };


  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">

  <LoadingOverlay isLoading={isLoading} />

    {error && <div className="text-red-500 mt-2">{error}</div>}
    {message && <div className="text-green-500 mt-2">{message}</div>}


  <div className="sm:mx-auto sm:w-full sm:max-w-md">
    <img alt="your Logo" src="/#" className="mx-auto h-10 w-auto" />
    <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-gray-900">
      {isLogin ? 'Sign in to your account' : 'Create a new account'}
    </h2>
  </div>

  <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
    <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
      <div className="flex justify-center mb-6">
        <button
          onClick={toggleTab}
          className={`px-4 py-2 font-semibold ${isLogin ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          Sign In
        </button>
        <button
          onClick={toggleTab}
          className={`px-4 py-2 font-semibold ${!isLogin ? 'text-indigo-600' : 'text-gray-500'}`}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? (
        <form onSubmit={handleLoginSubmit} className="space-y-6">
          <Input
            label="Email address"
            id="login-email"
            name="email"
            type="email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            id="login-password"
            name="password"
            type="password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div>
            <Button type="submit">Sign in</Button>
          </div>
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
        </form>
      ) : (
        <form onSubmit={handleSignupSubmit} className="space-y-6">
          <Input
            label="First Name"
            id="signup-first-name"
            name="firstName"
            type="text"
            value={signupFirstName}
            onChange={(e) => setSignupFirstName(e.target.value)}
            required
          />
          <Input
            label="Last Name"
            id="signup-last-name"
            name="lastName"
            type="text"
            value={signupLastName}
            onChange={(e) => setSignupLastName(e.target.value)}
            required
          />
          <Input
            label="Email address"
            id="signup-email"
            name="email"
            type="email"
            value={signupEmail}
            onChange={(e) => setSignupEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <Input
            label="Password"
            id="signup-password"
            name="password"
            type="password"
            value={signupPassword}
            onChange={(e) => setSignupPassword(e.target.value)}
            required
            autoComplete="new-password"
          />
          <Input
            label="Confirm Password"
            id="signup-password-confirm"
            name="confirmPassword"
            type="password"
            value={signupPasswordConfirm}
            onChange={(e) => setSignupPasswordConfirm(e.target.value)}
            required
          />
          <div>
            <Button type="submit">Sign up</Button>
          </div>
        </form>
      )}
    </div>
  </div>
</div>

  );
}
