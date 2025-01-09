"use client"

import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to /dashboard if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const handleLogin = () => {
    signIn('google', { callbackUrl: '/' }); // Specify callbackUrl for explicit redirection
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-96">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <button
          className="w-full py-2 bg-blue-500 text-white rounded"
          onClick={handleLogin}
        >
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
