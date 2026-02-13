import { getContactSubmissions, getRechnerSubmissions } from "@/lib/dal";
import {
  deleteContactSubmissionAction,
  deleteRechnerSubmissionAction,
  markContactReadAction,
  markRechnerReadAction,
} from "@/actions/admin/submissions";
import { ContactList } from "./ContactList";
import { RechnerList } from "./RechnerList";

export default async function SubmissionsPage() {
  const [contactSubs, rechnerSubs] = await Promise.all([
    getContactSubmissions(),
    getRechnerSubmissions(),
  ]);

  const contactUnread = contactSubs.filter((s) => !s.read).length;
  const rechnerUnread = rechnerSubs.filter((s) => !s.read).length;

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900">Anfragen</h1>
      <p className="mt-1 text-sm text-gray-600">
        Alle eingegangenen Kontakt- und Rechner-Anfragen.
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
    </div>
  );
}
