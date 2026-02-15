import { redirect, type ActionFunctionArgs, useLoaderData, useNavigation } from "react-router";
import { supabase } from "~/lib/supabase";
import { ProjectForm } from "../components/ProjectForm";

export async function loader() {
  const { data: rooms } = await supabase
    .from('Rooms')
    .select('room_name')
    .order('room_name', { ascending: true });

  return { rooms: rooms?.map(r => r.room_name) || [] };
}

export async function action({ request }: ActionFunctionArgs) {
  console.log(">>> 1. Action Received (New Path Strategy)");
  
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const room_name = formData.get("room_name") as string;
    const project_date = formData.get("project_date") as string;
    const featuredIndex = parseInt(formData.get("featured_index") as string || "0");

    // --- HER ER ÆNDRINGEN ---
    // Vi henter stier (tekst) i stedet for filer
    const beforePaths = formData.getAll("before_paths") as string[];
    const afterPaths = formData.getAll("after_paths") as string[];

    // 1. Get Room ID
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
    console.log(">>> 2. Project Created:", project.project_id);

    // 3. Process Image Paths (Vi uploader IKKE her, de er allerede i Storage)
    const allPaths = [
      ...beforePaths.map(p => ({ path: p, type: 'before' })),
      ...afterPaths.map(p => ({ path: p, type: 'after' }))
    ];

    console.log(`>>> 3. Creating DB references for ${allPaths.length} images...`);

    let featuredImageDbId: number | null = null;

    for (let i = 0; i < allPaths.length; i++) {
      const item = allPaths[i];
      
      // Bestem kategori: 0 for før, 1 for efter, 2 for valgt forside
      let finalCategory = item.type === 'before' ? 0 : 1;
      if (i === featuredIndex) {
        finalCategory = 2;
      }

      const { data: imgRecord, error: imgErr } = await supabase
        .from('ProjectImages')
        .insert([{
          project_id: project.project_id,
          file_name: item.path, // Dette er stien fra Storage
          content_type: 'image/jpeg',
          Category: finalCategory
        }])
        .select().single();

      if (imgErr) {
        console.error("DB Image Error:", imgErr);
        continue;
      }

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

    console.log(">>> 4. Success!");
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