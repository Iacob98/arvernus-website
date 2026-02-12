import Link from "next/link";
import { getProjects } from "@/lib/dal";
import { deleteProjectAction } from "@/actions/admin/projects";
import { ProjectsList } from "./ProjectsList";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Projekte</h1>
        <Link
          href="/admin/projects/new"
          className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
        >
          + Neues Projekt
        </Link>
      </div>
      <ProjectsList projects={projects} deleteAction={deleteProjectAction} />
    </div>
  );
}
