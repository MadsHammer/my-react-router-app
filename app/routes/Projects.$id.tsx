import { useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";
import { supabase } from "../lib/supabase";
import { ProjectDetails } from "../components/ProjectDetails";

export default function ProjectRoute() {
  const { project } = useLoaderData<typeof loader>();
  return <ProjectDetails project={project} />;
}

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;

  // 1. Hent projekt og rum-navn
  const { data: projectData, error: projectError } = await supabase
    .from('Projects') 
    .select('*, Rooms(room_name)')
    .eq('project_id', id)
    .single();

  if (projectError || !projectData) {
    throw new Response("Projekt ikke fundet", { status: 404 });
  }

  // 2. Hent billeder tilknyttet projektet
  const { data: imagesData, error: imagesError } = await supabase
    .from('ProjectImages')
    .select('*')
    .eq('project_id', id);

  // 3. Forbered data til ProjectDetails komponenten
  const formattedImages = imagesData?.map(img => {
    // Generer den fulde URL til billedet i din 'images' bucket
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(img.file_name);

    return {
      ...img,
      url: publicUrl, // Denne URL sender vi til komponenten
      Category: Number(img.Category)
    };
  }) || [];

  return {
    project: {
      ...projectData,
      room_name: projectData.Rooms?.room_name || 'Ukendt rum',
      images: formattedImages
    }
  };
}