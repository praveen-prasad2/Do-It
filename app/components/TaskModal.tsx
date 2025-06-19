"use client";

import { useState } from "react";
import { User } from "firebase/auth";
import { addUserTask } from "@/lib/firestoreHelpers";


interface Props {
  user: User;
  onClose: () => void;
}

export default function TaskModal({ user, onClose }: Props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState(["Work", "Personal", "Urgent"]);
  const [status, setStatus] = useState("Not Started");

  const handleAddCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setCategory(newCategory);
      setNewCategory("");
    }
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const newTask = {
    title,
    description,
    date,
    priority,
    category,
    status,
    createdAt: new Date(),
  };

  const res = await addUserTask(user.uid, newTask);

  if (res.success) {
    alert("Task added!");
    onClose();
    // Optionally: clear form fields here
  } else {
    alert("Something went wrong. Try again.");
  }
};


  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative animate-modalIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="w-full border border-gray-300 p-2 rounded text-black"
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            className="w-full border border-gray-300 p-2 rounded text-black"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          {/* Category Selector + Add New */}
          <div className="flex items-center gap-2">
            <div className="relative w-full text-black">
  <div
    onClick={() => setShowDropdown(!showDropdown)}
    className="border border-gray-300 rounded p-2 pr-8 cursor-pointer relative"
  >
    {category || "Select Category"}

    {/* Dropdown Arrow */}
    <svg
      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

  {/* Dropdown List */}
  {showDropdown && (
    <ul className="absolute z-10 w-full bg-white border border-gray-200 mt-1 rounded shadow">
      {categories.map((cat, idx) => (
        <li
          key={idx}
          onClick={() => {
            setCategory(cat);
            setShowDropdown(false);
          }}
          className="px-4 py-2 cursor-pointer hover:bg-[#6c63ff] hover:text-white"
        >
          {cat}
        </li>
      ))}
    </ul>
  )}
</div>


            <input
              type="text"
              className="w-32 border border-gray-300 p-2 rounded text-black"
              placeholder="New Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <button
              type="button"
              onClick={handleAddCategory}
              className="text-white bg-[#6c63ff] px-3 py-2 rounded hover:bg-[#6c63ff]"
            >
              Save
            </button>
          </div>

          {/* Priority */}
          <div className="flex gap-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="priority"
                value="Extreme"
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className="text-red-600">Extreme</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="priority"
                value="Moderate"
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className="text-blue-600">Moderate</span>
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="priority"
                value="Low"
                onChange={(e) => setPriority(e.target.value)}
              />
              <span className="text-green-600">Low</span>
            </label>
          </div>

          {/* Status */}
          <div className="flex gap-4">
            {["Not Started", "In Progress", "Completed", "On Hold"].map((s) => (
              <label key={s} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="status"
                  value={s}
                  checked={status === s}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <span className="text-black">{s}</span>
              </label>
            ))}
          </div>

          <textarea
            className="w-full border border-gray-300 p-2 rounded text-black"
            rows={4}
            placeholder="Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <button
            type="submit"
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Done
          </button>
        </form>
      </div>
    </div>
  );
}
