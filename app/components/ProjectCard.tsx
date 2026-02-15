import { Link, useLoaderData } from "react-router";

export function ProjectCard({ project }: { project: any }) {
  // Access global user data (ensure your root loader provides this)
  const { user } = useLoaderData() as { user: any };

  return (
    <div className="group relative h-full">
      {/* The Main Card Link 
        Wrapping the visual card makes the whole area clickable for a better UX 
      */}
      <Link 
        to={`/projects/${project.project_id}`} 
        className="block h-full no-underline"
      >
        <div className="h-full bg-secondary rounded-xl overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:shadow-black/50 border border-white/5 flex flex-col">
          
          {/* Image Wrapper */}
          <div className="relative h-48 w-full overflow-hidden">
            <img 
              src={project.featured_url} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Overlay for Admin - We use absolute positioning so it sits on top of the Link */}
            {user && (
              <Link
                to={`/admin/edit/${project.project_id}`}
                onClick={(e) => e.stopPropagation()} // Prevents triggering the main card link
                className="absolute top-2 right-2 bg-primary/80 hover:bg-primary text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-sm transition-colors z-20"
              >
                Rediger
              </Link>
            )}
          </div>

          {/* Content Body */}
          <div className="p-5 flex-grow">
            <h4 className="text-accent text-lg font-bold mb-2 group-hover:text-white transition-colors">
              {project.title}
            </h4>
            <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">
              {project.description}
            </p>
            
            <span className="inline-flex items-center text-primary font-semibold text-sm group-hover:translate-x-1 transition-transform">
              Se projektet <span className="ml-1">→</span>
            </span>
          </div>

          {/* Footer Area */}
          <div className="p-5 pt-0 flex justify-between items-center">
            <span className="bg-white/5 text-white/80 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
              {project.room_name}
            </span>
            <span className="text-white/30 text-xs font-medium">
              {new Date(project.project_date).toLocaleDateString('da-DK', {
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}