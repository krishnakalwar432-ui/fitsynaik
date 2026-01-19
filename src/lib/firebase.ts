// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBDt4IEurmuv-7NjD7zVCHM7PqVsuqvRRA",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fitsyn-bb412.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fitsyn-bb412",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

export default app;
