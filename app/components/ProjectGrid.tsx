// app/components/ProjectGrid.tsx
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: any[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-20 opacity-50 bg-[#121b33]/30 rounded-2xl border border-dashed border-white/10">
        <p className="text-lg">Ingen projekter fundet i denne kategori.</p>
      </div>
    );
  }

  return (
   
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 px-3">
      {projects.map((project) => (
        <ProjectCard key={project.project_id} project={project} />
      ))}
    </div>
  );
}