// This file is part of the Obli project. Used for the profile creation page after user signup.
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db } from '../../lib/firebase';
import { setDoc, doc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Loader from '../../components/Loader';
import SuccessModal from '../../components/SuccessModal';

export default function ProfileCreation() {
  const router = useRouter();
  const [user, loadingAuth] = useAuthState(auth);
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [colorScheme, setColorScheme] = useState('#CBAA6F');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loadingAuth && !user) {
      router.push('/auth'); // Redirect to auth if no user
    }
  }, [user, loadingAuth, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAvatar(e.target.files[0]);
    }
  };

  const uploadAvatar = async (file: File) => {
    const storage = getStorage();
    const avatarRef = ref(storage, `avatars/${user?.uid}/${file.name}`);
    await uploadBytes(avatarRef, file);
    const avatarURL = await getDownloadURL(avatarRef);
    return avatarURL;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    if (!user) {
      setErrorMessage('User is not authenticated. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      let avatarURL = null;
      if (avatar) {
        avatarURL = await uploadAvatar(avatar);
      }

      await updateProfile(user, {
        displayName: username,
        photoURL: avatarURL || undefined,
      });

      const userProfileRef = doc(db, 'users', user.uid);
      await setDoc(userProfileRef, {
        username,
        bio,
        colorScheme,
        avatar: avatarURL,
        createdAt: new Date().toISOString(),
      });

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('Profile creation error:', error);
      setErrorMessage('Profile creation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loadingAuth) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-black">
        <Loader />
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-black via-gray-900 to-[#1a1a1a] p-4">
      {loading && <Loader />}
      {success && <SuccessModal message="Profile Created! Redirecting to your dashboard..." />}

      <div className="flex flex-col gap-6 w-full max-w-md bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-white mb-4">Create Your Profile</h2>

        {errorMessage && (
          <div className="bg-red-500/20 text-red-400 p-2 rounded-lg text-center text-sm">
            {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#CBAA6F]"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <textarea
            placeholder="Bio (optional)"
            className="p-3 rounded-lg bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#CBAA6F]"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />

          <div className="flex items-center gap-3">
            <label htmlFor="colorScheme" className="text-white">Color Scheme:</label>
            <input
              type="color"
              id="colorScheme"
              value={colorScheme}
              onChange={(e) => setColorScheme(e.target.value)}
              className="w-10 h-10 p-0 border-2 border-white rounded-full cursor-pointer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="avatar" className="text-white">Upload Avatar:</label>
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="p-2 bg-white/10 text-white rounded-lg cursor-pointer"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !user}
            className="bg-[#CBAA6F] hover:bg-[#9E7A44] transition-all p-3 rounded-lg font-bold text-white hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating Profile...' : 'Create Profile'}
          </button>
        </form>
      </div>
    </main>
  );
}