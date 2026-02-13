import { Link } from "react-router";
import { useLoaderData } from "react-router";

export function ProjectCard({ project }: { project: any }) {

  const user = useLoaderData() as { user: any }; // Access the global user data

  return (
    // Instead of Bootstrap 'col', we rely on the parent's 'grid' (I'll show that next)
    <div className="group relative"> 
      <Link to={`/projects/${project.project_id}`} className="block h-full no-underline">
        
        {/* The Card Container */}
        <div className="h-full bg-[#121b33] rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50 border border-white/5">
          
          {/* Image Wrapper */}
          <div className="relative h-48 w-full overflow-hidden">
            <img 
              src={project.featured_url} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

                      {user ? (

            <span className="absolute top-2 right-2 bg-blue-600/80 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded backdrop-blur-sm transition-colors">
              Rediger projekt
            </span>
                      ) : null}
          </div>

          {/* Content Body */}
          <div className="p-4">
            <h4 className="text-blue-400 text-lg font-semibold mb-2">{project.title}</h4>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              {project.description?.substring(0, 80)}...
            </p>
            
            <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium">
              Se projektet
            </div>
          </div>

          {/* Footer Area */}
          <div className="p-4 pt-0 flex justify-between items-center mt-auto">
            <span className="bg-[#1d2847] text-white text-[11px] px-3 py-1 rounded-full border border-[#3a4b7c]">
              {project.room_name}
            </span>
            <span className="text-white/40 text-xs">
              {new Date(project.project_date).toLocaleDateString('da-DK')}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}