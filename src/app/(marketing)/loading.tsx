export default function MarketingLoading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero skeleton */}
      <div className="h-[500px] bg-gray-200" />

      {/* Content skeleton */}
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="mx-auto mb-8 h-8 w-64 rounded bg-gray-200" />
        <div className="mx-auto mb-4 h-4 w-full max-w-2xl rounded bg-gray-200" />
        <div className="mx-auto mb-12 h-4 w-3/4 max-w-2xl rounded bg-gray-200" />

        <div className="grid gap-8 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-100 bg-white p-6">
              <div className="mb-4 h-12 w-12 rounded-lg bg-gray-200" />
              <div className="mb-2 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-1 h-4 w-full rounded bg-gray-100" />
              <div className="h-4 w-2/3 rounded bg-gray-100" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
