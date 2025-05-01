'use client';

import { useState } from 'react';
import AuthForm from '@/components/AuthForm';

export default function AuthPage() {
  const [isSignUpVisible, setIsSignUpVisible] = useState(false);

  const handleSignUpToggle = () => {
    setIsSignUpVisible((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-gradient-to-b from-[#2c2c2c] to-[#3e3e3e] overflow-hidden">
      {/* Roman Columns */}
      <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-b from-[#A77D3D] to-[#7D5B3C] opacity-70 transform skew-x-12 hover:opacity-100 transition-all ease-in-out"></div>
      <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-b from-[#A77D3D] to-[#7D5B3C] opacity-70 transform skew-x-12 hover:opacity-100 transition-all ease-in-out"></div>

      {/* Header Bar with About Links */}
      <div className="bg-gradient-to-b from-[#CBAA6F] to-[#9E7A44] w-full p-4 flex justify-center items-center space-x-8 border-b-2 border-white/20 rounded-b-xl shadow-lg">
        <button className="text-[#D4B57E] font-semibold text-lg hover:text-[#FFD700] transition-all transform hover:scale-105">
          About Obli
        </button>
        <button className="text-[#D4B57E] font-semibold text-lg hover:text-[#FFD700] transition-all transform hover:scale-105">
          About Creators
        </button>
      </div>

      {/* Auth Form */}
      <div className="relative z-10 p-6 w-full max-w-md space-y-6 mx-auto my-12">
        <h1 className="text-4xl font-extrabold text-center text-[#D4B57E] hover:text-[#FFD700] transition-all ease-in-out">
          Obli
        </h1>
        <AuthForm
          isLogin={true}
          handleSignUpToggle={handleSignUpToggle}
          isSignUpVisible={isSignUpVisible}
        />
      </div>
    </div>
  );
}