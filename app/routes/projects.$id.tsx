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


  const { data: projectData, error: projectError } = await supabase
    .from('Projects') 
    .select('*, Rooms(room_name)')
    .eq('project_id', id)
    .single();

  if (projectError || !projectData) {
    throw new Response("Projekt ikke fundet", { status: 404 });
  }

  const { data: imagesData, error: imagesError } = await supabase
    .from('ProjectImages')
    .select('*')
    .eq('project_id', id);

  const getUrl = (name: string) => 
    supabase.storage.from('images').getPublicUrl(name).data.publicUrl;

  return {
    project: {
      ...projectData,
      room_name: projectData.Rooms?.room_name || 'Ukendt rum',
      images: imagesData?.map(img => ({ 
        url: getUrl(img.file_name), 
        category: Number(img.Category)
      })) || []
    }
  };
}
