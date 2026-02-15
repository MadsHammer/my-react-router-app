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
  console.log(">>> 1. Action Received");
  
  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const room_name = formData.get("room_name") as string;
    const project_date = formData.get("project_date") as string;
    
    // Catch the index sent by the ProjectForm component
    const featuredIndex = parseInt(formData.get("featured_index") as string || "0");

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

    // 3. Process Images
    const beforeFiles = formData.getAll("before_images") as File[];
    const afterFiles = formData.getAll("after_images") as File[];
    
    const allFiles = [
      ...beforeFiles.map(f => ({ file: f, type: 'before' })),
      ...afterFiles.map(f => ({ file: f, type: 'after' }))
    ].filter(item => item.file.size > 0);

    console.log(`>>> 3. Uploading ${allFiles.length} images...`);

    let featuredImageDbId: number | null = null;

    for (let i = 0; i < allFiles.length; i++) {
      const item = allFiles[i];
      
      const cleanFileName = item.file.name
        .replace(/[^a-z0-9.]/gi, '-')
        .replace(/-+/g, '-');

      const filePath = `${project.project_id}/${Date.now()}-${cleanFileName}`;      
      
      const { data: storageData, error: sErr } = await supabase.storage
        .from('images')
        .upload(filePath, item.file);

      if (sErr) {
        console.error("Storage Error:", sErr);
        continue;
      }

      // --- THE FIX IS HERE ---
      // Determine category: if it's the featured index, use 2. Otherwise, use 0 or 1.
      let finalCategory = item.type === 'before' ? 0 : 1;
      if (i === featuredIndex) {
        finalCategory = 2;
      }

      const { data: imgRecord, error: imgErr } = await supabase
        .from('ProjectImages')
        .insert([{
          project_id: project.project_id,
          file_name: filePath,
          content_type: item.file.type,
          Category: finalCategory // Now correctly identifies the featured image
        }])
        .select().single();

      if (imgErr) {
        console.error("DB Image Error:", imgErr);
        continue;
      }

      // Save the ID to link it to the main Project table
      if (imgRecord && i === featuredIndex) {
        featuredImageDbId = imgRecord.project_image_id;
      }
      
      // Fallback: if no image was successfully marked as featured yet, take the first one
      if (imgRecord && !featuredImageDbId) {
        featuredImageDbId = imgRecord.project_image_id;
      }
    }

    // 4. Update Project with the specific Featured Image ID
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