'use client';
import { User } from 'firebase/auth';
import Image from 'next/image';

export default function Sidebar({
  user,
  onLogout,
  onAddTaskClick,
  onSectionChange,
  activeSection,
}: {
  user: User;
  onLogout: () => void;
  onAddTaskClick: () => void;
  onSectionChange: (section: string) => void;
  activeSection: string;
}) {
  const navItems = [
    { label: 'Dashboard', value: 'dashboard' },
    { label: 'All Tasks', value: 'allTasks' },
    { label: 'Settings', value: 'settings' },
  ];

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

        <nav className="space-y-2 text-sm">
          {navItems.map((item) => (
            <div
              key={item.value}
              onClick={() => onSectionChange(item.value)}
              className={`cursor-pointer px-3 py-2 rounded transition-colors ${
                activeSection === item.value
                  ? 'bg-white text-[#6c63ff] font-semibold'
                  : 'hover:bg-white/20'
              }`}
            >
              {item.label}
            </div>
          ))}
        </nav>

        <button
          onClick={onAddTaskClick}
          className="mt-6 w-full py-2 rounded bg-white text-[#6c63ff] font-semibold text-sm hover:bg-purple-100"
        >
          + Add Task
        </button>
      </div>

      <button
        onClick={onLogout}
        className="mt-10 bg-red-500 hover:bg-red-600 w-full py-2 rounded text-sm"
      >
        Logout
      </button>
    </aside>
  );
}
