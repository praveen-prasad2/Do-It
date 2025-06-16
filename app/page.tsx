// pages/index.tsx or page.tsx (App Router)
'use client';

import { Rocket } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] to-[#1a1a1a] text-white flex items-center justify-center">
      <div className="text-center space-y-6 border border-neutral-700 p-10 rounded-2xl shadow-xl backdrop-blur-sm bg-white/5 w-full max-w-md">

        {/* ICON */}
        <div className="flex justify-center items-center space-x-2">
          <div className="w-14 h-14 flex items-center justify-center rounded-full border-2 border-neutral-500 bg-black/40">
            <Rocket className="text-purple-400 w-7 h-7" />
          </div>
        </div>

        {/* TEXT */}
        <div className="space-y-1">
          <p className="text-lg font-bold tracking-wide text-purple-300">NO PROCRASTINATION</p>
          <p className="text-sm text-neutral-400">DO IT NOW</p>
        </div>

        {/* BUTTON */}
        <button className="px-6 py-3 mt-4 rounded-full bg-purple-600 hover:bg-purple-700 transition-all font-medium shadow-md hover:shadow-purple-800/50">
          GET STARTED
        </button>
      </div>
    </div>
  );
}
