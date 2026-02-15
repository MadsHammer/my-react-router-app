import { supabase } from "../lib/supabase";

export function formatProjects(projects: any[], images: any[], rooms: any[]) {
  const roomMap = Object.fromEntries(rooms.map((r) => [r.room_id, r.room_name]));
  const getUrl = (name: string) => supabase.storage.from('images').getPublicUrl(name).data.publicUrl;

  return projects.map((project) => {
    const projectImages = images.filter((img) => img.project_id === project.project_id);
    const featured = projectImages.find(img => img.project_image_id === project.FeaturedImageId) || projectImages[0];

    return {
      ...project,
      room_name: roomMap[project.room_id] || 'Ukendt rum',
      featured_url: featured ? getUrl(featured.file_name) : 'https://via.placeholder.com/400x300',
      all_images: projectImages.map(img => ({ ...img, url: getUrl(img.file_name) }))
    };
  });
}