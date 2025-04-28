import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Firebase configuration from the Firebase Console
const firebaseConfig = {
  apiKey: 'AIzaSyATrnNYY9GwwpJGXTFq2hevpyKs4fuyIyE',
  authDomain: 'obli-3d059.firebaseapp.com',
  projectId: 'obli-3d059',
  storageBucket: 'obli-3d059.firebasestorage.app',
  messagingSenderId: '469327169643',
  appId: '1:469327169643:web:92cfb60c73d47fa278c92e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth and Firestore instances
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

// Function to save user profile to Firestore
const saveUserProfile = async (userId, username, bio, colorScheme, avatar) => {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      username,
      bio,
      colorScheme,
      avatar: avatar || null, // If avatar is provided
    });
  } catch (error) {
    console.error('Error saving user profile: ', error);
    alert('Failed to save profile.');
  }
};

// Function to upload avatar to Firebase Storage
const uploadAvatar = async (file) => {
  const avatarRef = ref(storage, 'avatars/' + file.name);

  try {
    // Upload the file to Firebase Storage
    await uploadBytes(avatarRef, file);
    
    // Get the download URL for the uploaded avatar
    const avatarURL = await getDownloadURL(avatarRef);
    return avatarURL;
  } catch (error) {
    console.error('Error uploading avatar: ', error);
    return null;
  }
};

// Export necessary elements
export { auth, db, storage, saveUserProfile, uploadAvatar };
