import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <h1 className="text-8xl font-bold text-[var(--primary)]">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-gray-800">
        Seite nicht gefunden
      </h2>
      <p className="mt-2 max-w-md text-gray-600">
        Die angeforderte Seite existiert leider nicht oder wurde verschoben.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center rounded-lg bg-[var(--primary)] px-6 py-3 text-white transition-colors hover:bg-[var(--primary-dark)]"
      >
        Zurück zur Startseite
      </Link>
    </div>
  );
}
