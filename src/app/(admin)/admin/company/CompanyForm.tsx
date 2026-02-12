"use client";

import { AdminForm } from "@/components/admin/AdminForm";
import type { CompanyData } from "@/types";

interface CompanyFormProps {
  company: CompanyData;
  action: (prevState: { success?: boolean; error?: string } | null, formData: FormData) => Promise<{ success?: boolean; error?: string }>;
}

export function CompanyForm({ company, action }: CompanyFormProps) {
  return (
    <AdminForm action={action} backHref="/admin">
      <div className="space-y-8">
        {/* Allgemein */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Allgemein</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firmenname (kurz)</label>
              <input name="name" defaultValue={company.name} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Firmenname (voll)</label>
              <input name="fullName" defaultValue={company.fullName} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
              <input name="tagline" defaultValue={company.tagline} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gründungsjahr</label>
              <input name="foundedYear" type="number" defaultValue={company.foundedYear} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Kontakt */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kontakt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
              <input name="phone" defaultValue={company.phone} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefon (Anzeige)</label>
              <input name="phoneDisplay" defaultValue={company.phoneDisplay} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">E-Mail</label>
              <input name="email" type="email" defaultValue={company.email} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
              <input name="whatsapp" defaultValue={company.whatsapp} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input name="website" defaultValue={company.website} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Adresse */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Adresse</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Straße</label>
              <input name="street" defaultValue={company.address.street} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PLZ</label>
              <input name="zip" defaultValue={company.address.zip} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stadt</label>
              <input name="city" defaultValue={company.address.city} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bundesland</label>
              <input name="state" defaultValue={company.address.state} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Land</label>
              <input name="country" defaultValue={company.address.country} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Öffnungszeiten */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Öffnungszeiten</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Werktags</label>
              <input name="weekdays" defaultValue={company.hours.weekdays} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Samstag</label>
              <input name="saturday" defaultValue={company.hours.saturday} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sonntag</label>
              <input name="sunday" defaultValue={company.hours.sunday} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Social Media */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Facebook</label>
              <input name="facebook" defaultValue={company.social.facebook} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instagram</label>
              <input name="instagram" defaultValue={company.social.instagram} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn</label>
              <input name="linkedin" defaultValue={company.social.linkedin} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>

        {/* Statistiken */}
        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Statistiken</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Projekte abgeschlossen</label>
              <input name="projectsCompleted" type="number" defaultValue={company.stats.projectsCompleted} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Zufriedenheitsrate (%)</label>
              <input name="satisfactionRate" type="number" defaultValue={company.stats.satisfactionRate} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max. Förderung (%)</label>
              <input name="maxFoerderung" type="number" defaultValue={company.stats.maxFoerderung} className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm" />
            </div>
          </div>
        </section>
      </div>
    </AdminForm>
  );
}
