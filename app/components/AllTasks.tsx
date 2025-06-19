"use client";

import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { fetchUserTasks, deleteUserTask } from "@/lib/firestoreHelpers";
import { TaskCard } from "./TaskCard";

interface AllTasksProps {
  user: User;
  onEdit?: (task: any) => void;
}

export default function AllTasks({ user, onEdit }: AllTasksProps) {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    const data = await fetchUserTasks(user.uid);
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const handleDelete = async (id: string) => {
    const confirm = window.confirm("Delete this task?");
    if (!confirm) return;

    const res = await deleteUserTask(user.uid, id);
    if (res.success) {
      setTasks((prev) => prev.filter((task) => task.id !== id));
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-black mb-4">All Tasks</h2>

      {loading ? (
        <div className="text-gray-500">Loading...</div>
      ) : tasks.length === 0 ? (
        <div className="text-gray-400">No tasks found.</div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task.id}
            {...task}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        ))
      )}
    </div>
  );
}
