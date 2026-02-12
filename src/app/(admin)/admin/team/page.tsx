import Link from "next/link";
import { getTeam } from "@/lib/dal";
import { deleteTeamMemberAction } from "@/actions/admin/team";
import { TeamList } from "./TeamList";

export default async function TeamPage() {
  const team = await getTeam();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Team</h1>
        <Link
          href="/admin/team/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neues Teammitglied
        </Link>
      </div>
      <TeamList team={team} deleteAction={deleteTeamMemberAction} />
    </div>
  );
}
