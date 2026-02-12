import { createProjectAction } from "@/actions/admin/projects";
import { ProjectForm } from "../ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Neues Projekt</h1>
      <ProjectForm action={createProjectAction} />
    </div>
  );
}
