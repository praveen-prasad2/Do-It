'use client';

import { useEffect, useState } from 'react';
import { signInWithPopup, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth, provider, db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Rocket } from 'lucide-react';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, setUser);
    return () => unsub();
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: user.displayName,
        photo: user.photoURL,
      });

      console.log('Logged in:', user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white flex flex-col items-center justify-center gap-6">
      <div className="text-center space-y-6 border border-neutral-700 p-10 rounded-2xl shadow-xl backdrop-blur-sm bg-white/5 w-full max-w-md">
        <div className="flex justify-center">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-neutral-500 bg-black/40">
            <Rocket className="text-purple-400 w-7 h-7" />
          </div>
        </div>

        <div className="space-y-1">
          <p className="text-lg font-bold tracking-wide text-purple-300">NO PROCRASTINATION</p>
          <p className="text-sm text-neutral-400">DO IT NOW</p>
        </div>

        {user ? (
          <>
            <div className="text-sm text-green-400">Welcome, {user.displayName}</div>
            <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-full">
              Logout
            </button>
          </>
        ) : (
          <button onClick={handleLogin} className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-full">
            Sign in with Google
          </button>
        )}
      </div>
    </div>
  );
}
