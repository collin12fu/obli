'use client';

import { useState } from 'react';
import AuthForm from '@/components/AuthForm'; // Import the AuthForm component

export default function SignUpPage() {
  const [isSignUp, setIsSignUp] = useState(true);  // This controls whether we show the sign-up form

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-800 overflow-hidden">
      <div className="relative z-10 p-6 w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center text-white">
          Create an Account
        </h1>

        {/* Show the AuthForm here */}
        <AuthForm isLogin={!isSignUp} />
      </div>
    </div>
  );
}