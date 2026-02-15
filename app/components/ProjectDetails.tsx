import { useState } from "react";
import { Link } from "react-router";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ProjectImage {
  file_name: string; // Corrected from 'url' to match your SQL
  Category: number;
}

interface ProjectDetailProps {
  project: {
    title: string;
    description: string;
    room_name: string;
    project_date: string;
    images: ProjectImage[];
    featured_url?: string;
  };
}

export function ProjectDetails({ project }: ProjectDetailProps) {
  const [index, setIndex] = useState(-1);

  // 1. HELPER: Fixes the "Double URL" and "Missing Prefix" issues
  const getImageUrl = (path: string | undefined | null) => {
    if (!path) return "";
    // If it's already a full URL (like the ones causing 400 errors), return it
    if (path.startsWith('http')) return path;
    // If it's just a filename (old records), add the prefix
    return `https://utqqeslftnzhwkcfymdj.supabase.co/storage/v1/object/public/images/${path}`;
  };

  // 2. DATA MAPPING: Use 'file_name' instead of 'url'
  const images = project?.images || [];
  
  const beforeImg = images.filter(img => img.Category === 0);
  const afterImg = images.filter(img => img.Category === 1);
  
  // Find the hero image
  const featuredImgRecord = images.find(img => img.Category === 2) || 
                            images.find(img => img.Category === 1) || 
                            images[0];

  const featuredImgUrl = featuredImgRecord 
    ? getImageUrl(featuredImgRecord.file_name) 
    : "";

  // Prepare slides for Lightbox
  const slides = images.map((img) => ({ 
    src: getImageUrl(img.file_name) 
  }));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      <Link 
        to="/" 
        className="inline-flex items-center px-4 py-2 border border-white/10 rounded-lg text-sm font-medium hover:bg-white/5 transition-colors mb-8 no-underline text-white/70 hover:text-white"
      >
        ← Tilbage til oversigt
      </Link>

      {/* Hero Section */}
      {featuredImgUrl ? (
        <div className="mb-12 rounded-3xl overflow-hidden border border-white/5 shadow-2xl h-[400px] md:h-[600px]">
    <img 
      src={featuredImgUrl} 
      className="w-full h-full object-cover" 
      alt="Projekt cover" 
    />
  </div>
      ) : (
        <div className="mb-12 rounded-3xl bg-secondary/30 h-[300px] flex items-center justify-center border border-dashed border-white/10">
            <span className="text-white/20">Ingen forsidebillede fundet</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
        <div className="lg:col-span-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">{project.title}</h1>
          <div className="p-8 bg-secondary rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-accent font-bold uppercase tracking-widest text-sm mb-4 border-b border-white/5 pb-2">
              Beskrivelse
            </h3>
            <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <div className="bg-secondary p-8 rounded-2xl border border-white/10 shadow-2xl">
              <h4 className="text-xl font-bold border-b border-white/10 pb-4 mb-6">Info</h4>
              <div className="mb-8">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Dato</label>
                <span className="text-lg font-medium">
                  {new Date(project.project_date).toLocaleDateString('da-DK', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-bold">Rum</label>
                <span className="inline-block px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-bold uppercase tracking-wider">
                  {project.room_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-20">
        {/* BEFORE ROW */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/30">Før</h3>
            <div className="h-px flex-grow bg-white/5"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {beforeImg.length > 0 ? (
              beforeImg.map((img, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-2xl overflow-hidden border border-white/10 cursor-pointer hover:scale-[1.02] transition-all hover:shadow-2xl bg-secondary group"
                  onClick={() => setIndex(project.images.findIndex(s => s.file_name === img.file_name))}
                >
                  <img src={getImageUrl(img.file_name)} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Før" />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 rounded-2xl border-2 border-dashed border-white/5 flex items-center justify-center text-white/10 font-bold uppercase tracking-widest text-sm">
                Ingen før-billeder
              </div>
            )}
          </div>
        </div>

        {/* AFTER ROW */}
        <div className="space-y-8">
          <div className="flex items-center gap-4">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Efter</h3>
            <div className="h-px flex-grow bg-primary/20"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {afterImg.length > 0 ? (
              afterImg.map((img, i) => (
                <div 
                  key={i} 
                  className="aspect-square rounded-2xl overflow-hidden border border-primary/20 cursor-pointer hover:scale-[1.02] transition-all shadow-xl shadow-primary/5 bg-secondary group"
                  onClick={() => setIndex(project.images.findIndex(s => s.file_name === img.file_name))}
                >
                  <img src={getImageUrl(img.file_name)} className="w-full h-full object-cover" alt="Efter" />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 rounded-2xl border-2 border-dashed border-primary/5 flex items-center justify-center text-primary/10 font-bold uppercase tracking-widest text-sm">
                Ingen efter-billeder
              </div>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </div>
  );
}