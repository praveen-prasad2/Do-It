'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAuth, isSignInWithEmailLink, signInWithEmailLink } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/lib/firebase'; // create this if needed

// Init Firebase client
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function AuthPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const email = window.localStorage.getItem('emailForSignIn'); // You must save this in your login page
    if (isSignInWithEmailLink(auth, window.location.href) && email) {
      signInWithEmailLink(auth, email, window.location.href)
        .then(() => {
          window.localStorage.removeItem('emailForSignIn');
          router.push('/dashboard'); // or wherever you want
        })
        .catch((error) => {
          console.error('Sign-in failed', error);
        });
    }
  }, []);

  return <p>Signing you in...</p>;
}
