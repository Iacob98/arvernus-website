import { notFound } from "next/navigation";
import { getTeam } from "@/lib/dal";
import { updateTeamMemberAction } from "@/actions/admin/team";
import { TeamMemberForm } from "../../TeamMemberForm";

export default async function EditTeamMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const team = await getTeam();
  const member = team.find((m) => m.id === id);
  if (!member) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Teammitglied bearbeiten</h1>
      <TeamMemberForm action={updateTeamMemberAction} member={member} />
    </div>
  );
}
