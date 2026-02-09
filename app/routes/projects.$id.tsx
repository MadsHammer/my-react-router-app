import { useLoaderData, Link } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { supabase } from "../lib/supabase";
import { ProjectDetailView } from "../components/ProjectDetails";


export default function ProjectRoute() {
  const { project } = useLoaderData<typeof loader>();
  
  // This passes the fetched data into your clean UI component
  return <ProjectDetailView project={project} />;
}
export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  // Fetch the specific project
  const { data: project, error } = await supabase
    .from('Projects')
    .select('*, Rooms(room_name)')
    .eq('project_id', id)
    .single();

  if (error || !project) throw new Response("Projekt ikke fundet", { status: 404 });

  // Fetch all images for this project
  const { data: images } = await supabase
    .from('ProjectImages')
    .select('*')
    .eq('project_id', id);

  const getUrl = (name: string) => supabase.storage.from('images').getPublicUrl(name).data.publicUrl;

  return {
    project: {
      ...project,
      room_name: project.Rooms?.room_name || 'Ukendt rum',
      images: images?.map(img => getUrl(img.file_name)) || []
    }
  };
}   

