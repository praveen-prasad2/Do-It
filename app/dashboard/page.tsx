'use client';

import Sidebar from "@/app/components/Sidebar";
import { TaskCard } from "@/app/components/TaskCard";
import { CompletedTaskCard } from "@/app/components/CompletedTaskCard";
import { Card, CardContent } from "@/app/components/ui/card";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import TaskModal from "@/app/components/TaskModal";

import Image from "next/image";

const allTasksByDate: Record<string, any[]> = {
  "2023-06-20": [
    {
      title: "Attend Nischal’s Birthday Party",
      description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
      status: "Not Started",
      priority: "Moderate",
      date: "2023-06-20",
    },
    {
      title: "Landing Page Design for TravelDays",
      description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
      status: "In Progress",
      priority: "Moderate",
      date: "2023-06-20",
    }
  ],
  "2023-06-19": [
    {
      title: "Presentation on Final Product",
      description: "Make sure everything is functioning and all the necessities are properly met.",
      status: "In Progress",
      priority: "Moderate",
      date: "2023-06-19",
    }
  ]
};

const completedTasks = [
  {
    title: "Walk the dog",
    description: "Take the dog to the park and bring treats as well.",
    status: "Completed",
  },
  {
    title: "Conduct meeting",
    description: "Meet with the client and finalize requirements.",
    status: "Completed",
  },
];



export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // 'YYYY-MM-DD'
  });
  const router = useRouter();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/');
      }
    });
    return () => unsub();
  }, [router]);

  const formatDateForHeader = (isoDate: string) => {
    const date = new Date(isoDate);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day}, ${month}, ${year}`;
  };

  const tasks = allTasksByDate[selectedDate] || [];

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (!user) return null;



  return (
    <div className="min-h-screen bg-purple-50 flex">
    <Sidebar user={user} onLogout={handleLogout} onAddTaskClick={() => setShowModal(true)} />

      <main className="flex-1 p-8">
        <div className="text-2xl font-[700] font-clover text-black mb-6 ">Welcome back, <span className="text-[#6c63ff]">{user.displayName?.split(' ')[0]}</span> 👋</div>
        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-semibold text-black">To-Do - {formatDateForHeader(selectedDate)}</div>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="text-sm border text-black border-gray-300 rounded px-2 py-1"
                />
              </div>
              {tasks.length > 0 ? (
                tasks.map((task, idx) => (
                  <TaskCard key={idx} {...task} />
                ))
              ) : (
                <div className="text-center p-4 bg-purple-100 border border-purple-300 rounded text-[#6c63ff] text-sm">
                  🎉 No tasks scheduled for this day. Enjoy your free time!
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold text-black mb-4">Task Status</div>
<div className="flex gap-6 font-sans">

  {/* Completed */}
  <div className="flex flex-col items-center text-center">
    <div className="relative w-20 h-20">
      <svg className="transform -rotate-90" width="80" height="80">
        <circle cx="40" cy="40" r="35" stroke="#d1fae5" strokeWidth="10" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#10b981"
          strokeWidth="10"
          fill="none"
          strokeDasharray="219.91"
          strokeDashoffset={(1 - 0.84) * 219.91}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-green-600 text-sm font-bold">
        84%
      </div>
    </div>
    <div className="mt-2 text-sm text-green-700">✔️ Completed</div>
  </div>

  {/* In Progress */}
  <div className="flex flex-col items-center text-center">
    <div className="relative w-20 h-20">
      <svg className="transform -rotate-90" width="80" height="80">
        <circle cx="40" cy="40" r="35" stroke="#dbeafe" strokeWidth="10" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#3b82f6"
          strokeWidth="10"
          fill="none"
          strokeDasharray="219.91"
          strokeDashoffset={(1 - 0.46) * 219.91}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-blue-600 text-sm font-bold">
        46%
      </div>
    </div>
    <div className="mt-2 text-sm text-blue-700">🔄 In Progress</div>
  </div>

  {/* Not Started */}
  <div className="flex flex-col items-center text-center">
    <div className="relative w-20 h-20">
      <svg className="transform -rotate-90" width="80" height="80">
        <circle cx="40" cy="40" r="35" stroke="#fee2e2" strokeWidth="10" fill="none" />
        <circle
          cx="40"
          cy="40"
          r="35"
          stroke="#ef4444"
          strokeWidth="10"
          fill="none"
          strokeDasharray="219.91"
          strokeDashoffset={(1 - 0.13) * 219.91}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-red-600 text-sm font-bold">
        13%
      </div>
    </div>
    <div className="mt-2 text-sm text-red-700">⏳ Not Started</div>
  </div>

</div>

            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-4 text-black">Completed Tasks</div>
              {completedTasks.map((task, idx) => (
                <CompletedTaskCard key={idx} {...task} />
              ))}
            </CardContent>
          </Card>
        </div>
        {showModal && user && (
  <TaskModal user={user} onClose={() => setShowModal(false)} />
)}

      </main>
    </div>
  );
}