'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/'); // Redirect to login if not signed in
      }
    });

    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/'); // Go back to login page
  };

  if (!user) return null; // Optionally add a loader

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center gap-6">
      <div className="text-center space-y-4 bg-white/5 backdrop-blur-sm p-10 rounded-xl border border-neutral-700 shadow-lg">
        <Image
          src={user.photoURL || ''}
          width={96}
          height={96}
          alt="Profile" 
          className="w-24 h-24 rounded-full border-4 border-purple-500 mx-auto"
        />
        <h2 className="text-xl font-semibold">{user.displayName}</h2>
        <p className="text-sm text-neutral-400">{user.email}</p>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-500 hover:bg-red-600 px-6 py-2 rounded-full text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
