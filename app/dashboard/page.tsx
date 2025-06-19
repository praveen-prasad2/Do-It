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

import AllTasks from "@/app/components/AllTasks";
import Settings from "@/app/components/Settings";
import Dashboarcontent from "@/app/components/DashBoardContent";

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
const [activeSection, setActiveSection] = useState("dashboard");



  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  if (!user) return null;

  



  return (
    <div className="min-h-screen bg-purple-50 flex">
  <Sidebar
  user={user}
  onLogout={handleLogout}
  onAddTaskClick={() => setShowModal(true)}
  onSectionChange={setActiveSection}
  activeSection={activeSection}
/>





      <main className="flex-1 p-8">
  <div className="text-2xl font-[700] font-clover text-black mb-6">
    Welcome back, <span className="text-[#6c63ff]">{user.displayName?.split(" ")[0]}</span> 👋
  </div>

  {activeSection === "dashboard" && (
  <>
    <div className="grid grid-cols-3 gap-6">
      <Dashboarcontent />
    </div>
  </>
)}

{activeSection === "allTasks" && <AllTasks user={user} onEdit={() => {}} />}
{/* {activeSection === "myTasks" && <MyTasks />}
{activeSection === "vital" && <VitalTasks />}
{activeSection === "categories" && <div>📁 Task Categories</div>} */}
{activeSection === "settings" && <Settings />}

</main>
{showModal && user && (
  <TaskModal user={user} onClose={() => setShowModal(false)} />
)}
    </div>
  );
}