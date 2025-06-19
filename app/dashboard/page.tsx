'use client';

import Sidebar from "@/app/components/Sidebar";
import { TaskCard } from "@/app/components/TaskCard";
import { CompletedTaskCard } from "@/app/components/CompletedTaskCard";
import { Card, CardContent } from "@/app/components/ui/card";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";

const tasks = [
  {
    title: "Attend Nischal’s Birthday Party",
    description: "Buy gifts on the way and pick up cake from the bakery. (6 PM | Fresh Elements)",
    status: "Not Started",
    priority: "Moderate",
    date: "20/06/2023",
  },
  {
    title: "Landing Page Design for TravelDays",
    description: "Get the work done by EOD and discuss with client before leaving. (4 PM | Meeting Room)",
    status: "In Progress",
    priority: "Moderate",
    date: "20/06/2023",
  },
  {
    title: "Presentation on Final Product",
    description: "Make sure everything is functioning and all the necessities are properly met.",
    status: "In Progress",
    priority: "Moderate",
    date: "19/06/2023",
  },
];

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

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-purple-50 flex">
      <Sidebar />
      <main className="flex-1 p-8">
        {/* Top bar with user profile */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-2xl font-semibold">Welcome back, {user.displayName?.split(' ')[0]} 👋</div>
          <div className="flex items-center gap-4 bg-white p-2 px-4 rounded-full shadow border border-gray-200">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                width={40}
                height={40}
                alt="User"
                className="rounded-full"
              />
            )}
            <div className="text-sm text-gray-800">{user.email}</div>
            <button
              onClick={handleLogout}
              className="ml-4 text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-4">To-Do - 20 June</div>
              {tasks.map((task, idx) => (
                <TaskCard key={idx} {...task} />
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-4">Task Status</div>
              <div className="space-y-3">
                <div className="text-green-600">✔️ Completed: 84%</div>
                <div className="text-blue-600">🔄 In Progress: 46%</div>
                <div className="text-red-600">⏳ Not Started: 13%</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-lg font-semibold mb-4">Completed Tasks</div>
              {completedTasks.map((task, idx) => (
                <CompletedTaskCard key={idx} {...task} />
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
