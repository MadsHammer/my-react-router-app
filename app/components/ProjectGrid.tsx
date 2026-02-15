// app/components/ProjectGrid.tsx
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: any[] }) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-32 bg-secondary/30 rounded-3xl border-2 border-dashed border-white/5 animate-fade-in">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/5 mb-4">
          <span className="text-2xl opacity-20">📂</span>
        </div>
        <p className="text-lg text-white/40 font-medium tracking-wide">
          Ingen projekter fundet i denne kategori.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-0 animate-fade-in">
      {projects.map((project) => (
        <ProjectCard key={project.project_id} project={project} />
      ))}
    </div>
  );
}