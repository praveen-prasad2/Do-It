export default function Sidebar() {
  return (
    <aside className="w-64 bg-purple-700 text-white p-5">
      <div className="text-xl font-bold mb-4">Dashboard</div>
      <nav className="space-y-4">
        <div>Dashboard</div>
        <div>Vital Task</div>
        <div>My Task</div>
        <div>Task Categories</div>
        <div>Settings</div>
        <div>Help</div>
        <div className="mt-10">Logout</div>
      </nav>
    </aside>
  );
}