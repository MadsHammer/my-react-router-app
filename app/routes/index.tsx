import { useLoaderData, useNavigate } from "react-router";
import { useState, useMemo } from "react";
import { supabase } from "../lib/supabase";
import { ProjectCard } from "../components/ProjectCard";
import { Sidebar } from "../components/Sidebar";

// --- 1. THE LOADER (Server-side Data Fetching) ---
export async function loader() {
  const [projRes, imgRes, roomRes] = await Promise.all([
    supabase.from('Projects').select('*'),
    supabase.from('ProjectImages').select('*'),
    supabase.from('Rooms').select('*')
  ]);

  if (projRes.error) throw new Error("Kunne ikke hente projekter");

  const roomMap = Object.fromEntries(
    roomRes.data?.map((r) => [r.room_id, r.room_name]) || []
  );

  const mergedProjects = projRes.data?.map((project) => {
    const projectImages = imgRes.data?.filter((img) => img.project_id === project.project_id) || [];
    
    // Logic to find featured image
    const featured = projectImages.find(img => img.project_image_id === project.FeaturedImageId) || projectImages[0];
    
    const getUrl = (name: string) => supabase.storage.from('images').getPublicUrl(name).data.publicUrl;

    return {
      ...project,
      room_name: roomMap[project.room_id] || 'Ukendt rum',
      featured_url: featured ? getUrl(featured.file_name) : 'https://via.placeholder.com/400x300',
      all_images: projectImages.map(img => ({ ...img, url: getUrl(img.file_name) }))
    };
  });

  return { projects: mergedProjects || [] };
}

// --- 2. THE UI COMPONENT ---
export default function Index() {
  const { projects } = useLoaderData<typeof loader>();
  
  // Local state for filtering/sorting (UI only)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Helper logic
  const uniqueRooms = useMemo(() => 
    [...new Set(projects.map(p => p.room_name))].sort()
  , [projects]);

  const filteredProjects = useMemo(() => {
    let list = [...projects];
    if (selectedRoom) list = list.filter(p => p.room_name === selectedRoom);
    list.sort((a, b) => {
      const dA = new Date(a.project_date || 0).getTime();
      const dB = new Date(b.project_date || 0).getTime();
      return sortOrder === 'desc' ? dB - dA : dA - dB;
    });
    return list;
  }, [projects, selectedRoom, sortOrder]);

  return (
    <div className="container mt-4">
      <div className="row">
        <Sidebar 
          rooms={uniqueRooms} 
          selectedRoom={selectedRoom} 
          onSelectRoom={setSelectedRoom} 
        />
        
        <div className="col-lg-9">
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {filteredProjects.map(project => (
              <ProjectCard key={project.project_id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}