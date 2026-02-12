import { createTeamMemberAction } from "@/actions/admin/team";
import { TeamMemberForm } from "../TeamMemberForm";

export default function NewTeamMemberPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neues Teammitglied</h1>
      <TeamMemberForm action={createTeamMemberAction} />
    </div>
  );
}
