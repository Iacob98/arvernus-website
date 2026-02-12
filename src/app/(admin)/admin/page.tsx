import Link from "next/link";
import { getTestimonials, getProjects, getPartners, getTeam, getTimeline, getFAQ } from "@/lib/dal";

export default async function AdminDashboard() {
  const [testimonials, projects, partners, team, timeline, faq] = await Promise.all([
    getTestimonials(),
    getProjects(),
    getPartners(),
    getTeam(),
    getTimeline(),
    getFAQ(),
  ]);

  const faqCount = faq.general.length + faq.waermepumpen.length + faq.photovoltaik.length + faq.foerderung.length;

  const stats = [
    { label: "Bewertungen", count: testimonials.length, href: "/admin/testimonials" },
    { label: "Projekte", count: projects.length, href: "/admin/projects" },
    { label: "Partner", count: partners.length, href: "/admin/partners" },
    { label: "Team", count: team.length, href: "/admin/team" },
    { label: "Timeline", count: timeline.length, href: "/admin/timeline" },
    { label: "FAQ", count: faqCount, href: "/admin/faq" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      <p className="mt-1 text-sm text-gray-600">Willkommen in der Arvernus Admin-Verwaltung.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat) => (
          <Link
            key={stat.href}
            href={stat.href}
            className="rounded-xl border border-gray-200 bg-white p-5 hover:border-primary/30 hover:shadow-sm transition-all"
          >
            <p className="text-3xl font-bold text-primary">{stat.count}</p>
            <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Schnellzugriff</h2>
          <div className="mt-4 space-y-2">
            <Link href="/admin/company" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Kontaktdaten bearbeiten
            </Link>
            <Link href="/admin/testimonials/new" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Neue Bewertung hinzufügen
            </Link>
            <Link href="/admin/projects/new" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Neues Projekt hinzufügen
            </Link>
            <Link href="/admin/services" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Leistungen bearbeiten
            </Link>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-gray-900">Website</h2>
          <div className="mt-4 space-y-2">
            <a href="/" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Startseite ansehen
            </a>
            <a href="/referenzen" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Referenzen ansehen
            </a>
            <a href="/ueber-uns" target="_blank" rel="noopener noreferrer" className="block rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
              Über uns ansehen
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
