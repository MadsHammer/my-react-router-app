import { useState, useMemo } from "react";

export function useProjectFilters(projects: any[]) {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const uniqueRooms = useMemo(() => 
    [...new Set(projects.map(p => p.room_name))].sort()
  , [projects]);

  const filteredAndSorted = useMemo(() => {
    let list = [...projects];

    if (selectedRoom) {
      list = list.filter(p => p.room_name === selectedRoom);
    } 

    list = list.sort((a, b) => { // Sort by project_date we use list = [...list].sort(...) to avoid mutating original array
      const dA = new Date(a.project_date || 0).getTime();
      const dB = new Date(b.project_date || 0).getTime();
      return sortOrder === 'newest' ? dB - dA : dA - dB;
    });

    return list;
  }, [projects, selectedRoom, sortOrder]);

  return { filteredAndSorted, uniqueRooms, selectedRoom, setSelectedRoom, sortOrder, setSortOrder };
}