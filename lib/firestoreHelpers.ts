import { db } from "./firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  addDoc, // ✅ required for adding tasks
} from "firebase/firestore";

import { doc, deleteDoc, updateDoc } from "firebase/firestore";

// Create or Add new Task


export const addUserTask = async (userId: string, task: any) => {
  try {
    const taskRef = collection(db, "users", userId, "tasks");
    await addDoc(taskRef, task);
    return { success: true };
  } catch (error) {
    console.error("Error adding task:", error);
    return { success: false, error };
  }
};

// Get or Fetch Task


export const fetchUserTasks = async (userId: string) => {
  try {
    const taskRef = collection(db, "users", userId, "tasks");
    const q = query(taskRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

// Delete Task


export const deleteUserTask = async (userId: string, taskId: string) => {
  try {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await deleteDoc(taskRef);
    return { success: true };
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, error };
  }
};

// Update Task

export const updateUserTask = async (
  userId: string,
  taskId: string,
  updatedFields: Partial<any>
) => {
  try {
    const taskRef = doc(db, "users", userId, "tasks", taskId);
    await updateDoc(taskRef, updatedFields);
    return { success: true };
  } catch (error) {
    console.error("Error updating task:", error);
    return { success: false, error };
  }
};

