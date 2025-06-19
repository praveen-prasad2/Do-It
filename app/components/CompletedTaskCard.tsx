interface CompletedTaskProps {
  title: string;
  description: string;
  status: string;
}

export function CompletedTaskCard({ title, description, status }: CompletedTaskProps) {
  return (
    <div className="mb-3 p-3 border rounded bg-white">
      <div className="font-medium">{title}</div>
      <div className="text-sm text-gray-600">{description}</div>
      <div className="text-xs text-green-600">Status: {status}</div>
    </div>
  );
}
