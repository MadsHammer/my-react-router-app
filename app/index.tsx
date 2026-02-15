import { useLoaderData } from "react-router";
import { supabase } from "./lib/supabase";
import { formatProjects } from "./store/projectStore";
import { useProjectFilters } from "./hooks/useProjectFilters";
import { Sidebar, SortControls, ProjectGrid } from "./components";

export async function loader() {
  const [p, i, r] = await Promise.all([
    supabase.from('Projects').select('*'),
    supabase.from('ProjectImages').select('*'),
    supabase.from('Rooms').select('*')
  ]);

  return { projects: formatProjects(p.data || [], i.data || [], r.data || []) };
}

export default function Index() {
  const { projects } = useLoaderData<typeof loader>();
  const { 
    filteredAndSorted, uniqueRooms, selectedRoom, setSelectedRoom, sortOrder, setSortOrder 
  } = useProjectFilters(projects);

  return (
 
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
       
        <aside className="lg:col-span-3">
          <Sidebar 
            rooms={uniqueRooms} 
            selectedRoom={selectedRoom} 
            onSelectRoom={setSelectedRoom} 
          />
        </aside>

       
        <main className="lg:col-span-9">
          <SortControls sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <ProjectGrid projects={filteredAndSorted} />
        </main>

      </div>
    </div>
  );
}