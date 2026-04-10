"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-bold text-[var(--secondary)]">500</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Ein Fehler ist aufgetreten
      </h2>
      <p className="mt-2 max-w-md text-gray-600">
        Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.
      </p>
      <button
        onClick={reset}
        className="mt-8 inline-flex items-center rounded-lg bg-[var(--primary)] px-6 py-3 text-white transition-colors hover:bg-[var(--primary-dark)]"
      >
        Erneut versuchen
      </button>
    </div>
  );
}
