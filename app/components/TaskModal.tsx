"use client";

import { useState } from "react";
// import { addUserTask } from "@/lib/firestoreHelpers"; // helper from earlier
import { User } from "firebase/auth";

interface Props {
  user: User;
  onClose: () => void;
}

export default function TaskModal({ user, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      date,
      priority,
      status: "Not Started",
      createdAt: new Date(),
    };
    // const res = await addUserTask(user.uid, newTask);
    // if (res.success) {
    //   alert("Task added!");
    //   onClose();
    // }
  };

  return (
    
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">


      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-modalIn">
        <button onClick={onClose} className="absolute top-4 right-4 text-sm text-gray-500 hover:text-black">
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            className="w-full border border-gray-300 p-2 rounded"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input type="radio" name="priority" value="Extreme" onChange={(e) => setPriority(e.target.value)} />
              <span className="text-red-600">Extreme</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="priority" value="Moderate" onChange={(e) => setPriority(e.target.value)} />
              <span className="text-blue-600">Moderate</span>
            </label>
            <label className="flex items-center gap-1">
              <input type="radio" name="priority" value="Low" onChange={(e) => setPriority(e.target.value)} />
              <span className="text-green-600">Low</span>
            </label>
          </div>
          <textarea
            className="w-full border border-gray-300 p-2 rounded"
            rows={4}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
            Done
          </button>
        </form>
      </div>
    </div>
  );
}
