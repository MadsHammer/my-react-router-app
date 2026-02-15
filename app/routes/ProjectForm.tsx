import { redirect, type ActionFunctionArgs, useLoaderData, useNavigation } from "react-router";
import { supabase } from "~/lib/supabase";
import { ProjectForm } from "../components/ProjectForm";

/**
 * LOADER: SIKRER AT KUN ADMIN KAN SE SIDEN
 */
export async function loader() {
  // Tjek om brugeren er logget ind i Supabase
  const { data: { session } } = await supabase.auth.getSession();

  // Hvis ikke logget ind -> smid dem til login-siden
  if (!session) {
    return redirect("/login");
  }

  const { data: rooms } = await supabase
    .from('Rooms')
    .select('room_name')
    .order('room_name', { ascending: true });

  return { rooms: rooms?.map(r => r.room_name) || [] };
}

/**
 * ACTION: GEMMER DATA I DATABASEN (Kører på serveren)
 */
export async function action({ request }: ActionFunctionArgs) {
  console.log(">>> 1. Action Received");
  
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const room_name = formData.get("room_name") as string;
    const project_date = formData.get("project_date") as string;
    const featuredIndex = parseInt(formData.get("featured_index") as string || "0");

    const beforePaths = formData.getAll("before_paths") as string[];
    const afterPaths = formData.getAll("after_paths") as string[];

    // 1. Find Room ID
    const { data: roomData, error: roomError } = await supabase
      .from('Rooms')
      .select('room_id')
      .eq('room_name', room_name)
      .single();

    if (roomError || !roomData) throw new Error(`Room "${room_name}" not found.`);

    // 2. Insert Project
    const { data: project, error: pError } = await supabase
      .from('Projects')
      .insert([{
        title,
        description,
        room_id: roomData.room_id,
        project_date: new Date(project_date).toISOString(),
      }])
      .select().single();

    if (pError) throw pError;

    // 3. Process Image Paths
    const allPaths = [
      ...beforePaths.map(p => ({ path: p, type: 'before' })),
      ...afterPaths.map(p => ({ path: p, type: 'after' }))
    ];

    let featuredImageDbId: number | null = null;

    for (let i = 0; i < allPaths.length; i++) {
      const item = allPaths[i];
      let finalCategory = item.type === 'before' ? 0 : 1;
      if (i === featuredIndex) finalCategory = 2;

      const { data: imgRecord, error: imgErr } = await supabase
        .from('ProjectImages')
        .insert([{
          project_id: project.project_id,
          file_name: item.path,
          content_type: 'image/jpeg',
          Category: finalCategory
        }])
        .select().single();

      if (imgRecord && i === featuredIndex) {
        featuredImageDbId = imgRecord.project_image_id;
      }
    }

    // 4. Update Project with Featured Image ID
    if (featuredImageDbId) {
      await supabase
        .from('Projects')
        .update({ "FeaturedImageId": featuredImageDbId })
        .eq('project_id', project.project_id);
    }

    return redirect("/");

  } catch (err: any) {
    console.error("Action Error:", err.message);
    return { error: err.message };
  }
}

export default function ProjectFormPage() {
  const { rooms } = useLoaderData<typeof loader>();
  const navigation = useNavigation();

  return (
    <main className="p-8 max-w-5xl mx-auto">
      <ProjectForm rooms={rooms} isSubmitting={navigation.state === "submitting"} />
    </main>
  );
}