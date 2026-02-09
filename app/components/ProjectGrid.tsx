// app/components/ProjectGrid.tsx
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: any[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-5 opacity-50">
        <p>Ingen projekter fundet i denne kategori.</p>
      </div>
    );
  }

  return (

    <div className="row row-cols-1 row-cols-md-2 g-4 px-3">
      {projects.map((project) => (
        <ProjectCard key={project.project_id} project={project} />
      ))}
    </div>
  );
}