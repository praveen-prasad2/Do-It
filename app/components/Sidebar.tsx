// components/Sidebar.tsx
'use client';
import { User } from 'firebase/auth';
import Image from 'next/image';

export default function Sidebar({
  user,
  onLogout,
  onAddTaskClick
}: {
  user: User;
  onLogout: () => void;
  onAddTaskClick: () => void;
}) {
  return (
    <aside className="w-64 bg-[#6c63ff] text-white p-5 flex flex-col justify-between">
      <div>
        <div className="text-xl font-bold mb-6">Dashboard</div>
        <div className="flex flex-col items-center text-center mb-6">
          {user.photoURL && (
            <Image
              src={user.photoURL}
              width={64}
              height={64}
              alt="User"
              className="rounded-full border-2 border-white"
            />
          )}
          <div className="mt-2 font-medium">{user.displayName}</div>
          <div className="text-sm text-white">{user.email}</div>
        </div>
        <nav className="space-y-4 text-sm">
          <div>Dashboard</div>
          <div>Vital Task</div>
          <div>My Task</div>
          <div>Task Categories</div>
          <div>Settings</div>
          <div>Help</div>
        </nav>

        {/* Add Task Button */}
        <button
          onClick={onAddTaskClick}
          className="mt-6 w-full py-2 rounded bg-white text-[#6c63ff] font-semibold text-sm hover:bg-purple-100"
        >
          + Add Task
        </button>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="mt-10 bg-red-500 hover:bg-red-600 w-full py-2 rounded text-sm"
      >
        Logout
      </button>
    </aside>
  );
}
