interface TaskProps {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  date: string;
  category: string;
  createdAt?: any;
  onDelete?: (id: string) => void;
  onEdit?: (task: any) => void;
}

export function TaskCard({
  id,
  title,
  description,
  status,
  priority,
  date,
  category,
  createdAt,
  onDelete,
  onEdit,
}: TaskProps) {
  const created = createdAt?.toDate ? createdAt.toDate().toLocaleDateString() : "";

  return (
    <div className="mb-4 p-3 border rounded bg-white relative">
      <div className="font-medium text-lg text-black">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="text-xs mt-1 text-gray-700">
        Category: {category} | Priority: {priority} | Status: {status}
      </div>
      <div className="text-xs text-gray-400">
        Task Date: {date} {created && `| Created: ${created}`}
      </div>
      <div className="absolute top-2 right-2 flex gap-2">
        <button
          className="text-xs text-blue-500 hover:underline"
          onClick={() => onEdit?.({ id, title, description, status, priority, date, category })}
        >
          Edit
        </button>
        <button
          className="text-xs text-red-500 hover:underline"
          onClick={() => onDelete?.(id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
