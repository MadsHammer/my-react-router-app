export function ProjectCard({ project }: { project: any }) {
  return (
    <div className="col">
      <div className="card h-100 bg-darkblue border-0 hover-shadow overflow-hidden">
        <img 
          src={project.featured_url} 
          className="card-img-top" 
          style={{ height: '200px', objectFit: 'cover' }} 
        />
        <div className="card-body">
          <h5 className="text-primary">{project.title}</h5>
          <p className="small opacity-75">{project.description?.substring(0, 80)}...</p>
        </div>
        <div className="card-footer d-flex justify-content-between align-items-center border-0 bg-transparent">
          <span className="room-pill">{project.room_name}</span>
          <span className="opacity-50 small">
            {new Date(project.project_date).toLocaleDateString('da-DK')}
          </span>
        </div>
      </div>
    </div>
  );
}