interface TaskProps {
  title: string;
  description: string;
  status: string;
  priority: string;
  date: string;
}

export function TaskCard({ title, description, status, priority, date }: TaskProps) {
  return (
    <div className="mb-4 p-3 border rounded bg-white">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="text-xs mt-1">Priority: {priority} | Status: {status}</div>
      <div className="text-xs text-gray-400">Created on: {date}</div>
    </div>
  );
}