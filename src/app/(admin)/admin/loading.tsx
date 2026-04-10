export default function AdminLoading() {
  return (
    <div className="animate-pulse p-6">
      <div className="mb-6 h-8 w-48 rounded bg-gray-200" />
      <div className="rounded-lg border border-gray-100 bg-white p-6">
        <div className="mb-4 h-5 w-32 rounded bg-gray-200" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 w-full rounded bg-gray-100" />
          ))}
        </div>
      </div>
    </div>
  );
}
