import { Link, useLoaderData } from "react-router";
export function ProjectCard({ project }: { project: any }) {
  const { user } = useLoaderData() as { user: any };
  
const getImageUrl = (path: string) => {
  if (!path) return "/placeholder.jpg";
  if (path.startsWith('http')) return path;
  return `https://utqqeslftnzhwkcfymdj.supabase.co/storage/v1/object/public/images/${path}`;
};

const imageUrl = getImageUrl(project.ProjectImages?.file_name || project.featured_url);
  return (
    <div className="group relative h-full">
      <Link 
        to={`/projects/${project.project_id}`} 
        className="block h-full no-underline"
      >
        <div className="h-full bg-secondary rounded-xl overflow-hidden transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-2xl border border-white/5 flex flex-col">
          
          {/* Image Wrapper */}
          <div className="relative h-48 w-full overflow-hidden">
            <img 
              src={imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-50"
            />

            {/* HOVER OVERLAY: Se projektet */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold uppercase tracking-widest shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                Se projektet
              </span>
            </div>
            
            {/* Admin Edit Button */}
            {user && (
              <Link
                to={`/admin/edit/${project.project_id}`}
                onClick={(e) => e.stopPropagation()}
                className="absolute top-2 right-2 bg-white/10 hover:bg-white/20 text-white text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded backdrop-blur-md transition-colors z-20 border border-white/10"
              >
                Rediger
              </Link>
            )}
          </div>

          {/* Content Body */}
          <div className="p-5 flex-grow">
            <h4 className="text-accent text-lg font-bold mb-2 group-hover:text-primary transition-colors">
              {project.title}
            </h4>
            <p className="text-white/60 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Footer Area */}
          <div className="p-5 pt-0 flex justify-between items-center">
            <span className="bg-white/5 text-white/80 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">
              {project.room_name}
            </span>
            <span className="text-white/30 text-xs font-medium uppercase tracking-tighter">
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
