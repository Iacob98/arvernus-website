import { notFound } from "next/navigation";
import { getProjects } from "@/lib/dal";
import { updateProjectAction } from "@/actions/admin/projects";
import { ProjectForm } from "../../ProjectForm";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const projects = await getProjects();
  const project = projects.find((p) => p.id === id);
  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Projekt bearbeiten</h1>
      <ProjectForm action={updateProjectAction} project={project} />
    </div>
  );
}
