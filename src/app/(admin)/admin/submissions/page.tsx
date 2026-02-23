import { getContactSubmissions, getRechnerSubmissions, getPartnerSubmissions } from "@/lib/dal";
import {
  deleteContactSubmissionAction,
  deleteRechnerSubmissionAction,
  deletePartnerSubmissionAction,
  markContactReadAction,
  markRechnerReadAction,
  markPartnerReadAction,
} from "@/actions/admin/submissions";
import { ContactList } from "./ContactList";
import { RechnerList } from "./RechnerList";
import { PartnerList } from "./PartnerList";

export default async function SubmissionsPage() {
  const [contactSubs, rechnerSubs, partnerSubs] = await Promise.all([
    getContactSubmissions(),
    getRechnerSubmissions(),
    getPartnerSubmissions(),
  ]);

  const contactUnread = contactSubs.filter((s) => !s.read).length;
  const rechnerUnread = rechnerSubs.filter((s) => !s.read).length;
  const partnerUnread = partnerSubs.filter((s) => !s.read).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Anfragen</h1>
      <p className="mt-1 text-sm text-gray-600">
        Alle eingegangenen Kontakt-, Rechner- und Partneranfragen.
      </p>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Kontaktanfragen
          {contactUnread > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {contactUnread} neu
            </span>
          )}
        </h2>
        <div className="mt-3">
          <ContactList
            submissions={contactSubs}
            deleteAction={deleteContactSubmissionAction}
            markReadAction={markContactReadAction}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Rechner-Anfragen
          {rechnerUnread > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {rechnerUnread} neu
            </span>
          )}
        </h2>
        <div className="mt-3">
          <RechnerList
            submissions={rechnerSubs}
            deleteAction={deleteRechnerSubmissionAction}
            markReadAction={markRechnerReadAction}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          Partneranfragen
          {partnerUnread > 0 && (
            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
              {partnerUnread} neu
            </span>
          )}
        </h2>
        <div className="mt-3">
          <PartnerList
            submissions={partnerSubs}
            deleteAction={deletePartnerSubmissionAction}
            markReadAction={markPartnerReadAction}
          />
        </div>
      </div>
    </div>
  );
}
