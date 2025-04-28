//Auth form component for login and signup using Firebase Authentication
// This component will handle both login and signup based on the isLogin prop

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { FcGoogle } from 'react-icons/fc';
import { motion, AnimatePresence } from 'framer-motion'; // 🆕 import
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../lib/firebase'; // Import Firestore

interface AuthFormProps {
  isLogin?: boolean;
  handleSignUpToggle: () => void;
  isSignUpVisible: boolean;
}

export default function AuthForm({ isLogin, handleSignUpToggle, isSignUpVisible }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // 🆕 new username state
  const [loading, setLoading] = useState(false);
  const provider = new GoogleAuthProvider();

  // Function to check if user profile exists and is complete
  const checkUserProfileComplete = async (userId: string) => {
    const userProfileRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userProfileRef);

    // Check if the document exists and if necessary fields are populated
    if (docSnap.exists()) {
      const userProfile = docSnap.data();
      return userProfile.username && userProfile.bio && userProfile.colorScheme; // Check necessary fields
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser;
        if (user) {
          const isProfileComplete = await checkUserProfileComplete(user.uid);
          if (isProfileComplete) {
            router.push('/dashboard');
          } else {
            router.push('/profile-creation');
          }
        }
      } else {
        if (password !== confirmPassword) {
          alert('Passwords do not match!');
          setLoading(false);
          return;
        }
        // Create user with email and password
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Redirect to Profile Creation page after successful sign-up
        router.push('/profile-creation');
      }
    } catch (error) {
      console.error(error);
      alert('Authentication failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Check if the profile is complete
      const isProfileComplete = await checkUserProfileComplete(user.uid);
      if (isProfileComplete) {
        // If profile exists and is complete, route to the dashboard
        router.push('/dashboard');
      } else {
        // If profile does not exist or is incomplete, route to profile creation
        router.push('/profile-creation');
      }
    } catch (error) {
      console.error(error);
      alert('Google sign-in failed.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg relative">
      {/* Sign-In Form */}
      <form
        onSubmit={handleSubmit}
        className={`flex flex-col gap-4 w-full ${isLogin ? 'opacity-100' : 'opacity-0'} bg-gradient-to-b from-[#CBAA6F] to-[#9E7A44] p-6 rounded-xl border border-[#7D5B3C] shadow-xl transition-all ease-in-out transform hover:scale-105 hover:shadow-2xl backdrop-blur-lg`}
      >
        <input
          type="email"
          placeholder="Email"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-[#CBAA6F] hover:bg-[#9E7A44] transition-all p-3 rounded-lg font-bold text-white hover:shadow-xl"
        >
          {loading ? <div className="loader"></div> : 'Log In'}
        </button>
      </form>

      {/* Sign Up Link Inside Sign In Box */}
      {isLogin && (
        <div className="mt-4 text-center text-white">
          Don't have an account?{' '}
          <button
            onClick={handleSignUpToggle}
            className="text-[#FFD700] hover:text-[#CBAA6F] transition-all underline"
          >
            Sign Up
          </button>
        </div>
      )}

      {/* Sign In with Google Button */}
      <div className="text-center text-white opacity-70">or</div>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center justify-center gap-2 bg-[#CBAA6F] hover:bg-[#9E7A44] transition-all p-3 rounded-lg font-bold text-white hover:shadow-xl group"
      >
        <FcGoogle
          size={24}
          className="filter brightness-0 invert transition-all duration-300 group-hover:drop-shadow-[0_0_6px_#FFD700]"
        />
        Sign in with Google
      </button>

      {/* Sign Up Modal with Animation */}
      <AnimatePresence>
        {isSignUpVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-md flex justify-center items-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="relative bg-gradient-to-b from-[#CBAA6F] to-[#9E7A44] p-8 rounded-xl shadow-xl w-4/5 max-w-lg transform backdrop-blur-lg"
            >
              {/* Close Button */}
              <button
                onClick={handleSignUpToggle}
                className="absolute top-4 right-4 text-white text-2xl hover:text-[#FFD700] transition-all"
              >
                ×
              </button>

              <h2 className="text-2xl font-bold text-center text-white mb-6">Create a New Account</h2>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="Desired Username"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#CBAA6F] hover:bg-[#9E7A44] transition-all p-3 rounded-lg font-bold text-white hover:shadow-xl"
                >
                  {loading ? <div className="loader"></div> : 'Sign Up'}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}