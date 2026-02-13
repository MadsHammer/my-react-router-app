import { useState } from "react";
import { Link } from "react-router";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ProjectDetailProps {
  project: {
    title: string;
    description: string;
    room_name: string;
    project_date: string;
    images: string[];
  };
}

export function ProjectDetailView({ project }: ProjectDetailProps) {
  const [index, setIndex] = useState(-1);
  const slides = project.images.map((url) => ({ src: url }));

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-white animate-fade-in">
      {/* 1. Navigation */}
      <Link 
        to="/" 
        className="inline-flex items-center px-4 py-2 border border-white/20 rounded-lg text-sm font-medium hover:bg-white/10 transition-colors mb-8 no-underline text-white"
      >
        ← Tilbage til oversigt
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* 2. Left Side: Title & Description (8 columns wide) */}
        <div className="lg:col-span-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight">{project.title}</h1>
          
          <div className="p-6 bg-[#121b33] rounded-2xl border border-white/5 shadow-xl">
            <h3 className="text-blue-400 font-semibold mb-4 border-b border-blue-400/20 pb-2">
              Beskrivelse
            </h3>
            <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>

        {/* 3. Right Side: Meta Info Box (4 columns wide) */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-8">
            <div className="bg-[#121b33] p-6 rounded-2xl border border-white/10 shadow-2xl">
              <h4 className="text-xl font-bold border-b border-white/10 pb-3 mb-6">Projekt Detaljer</h4>
              
              <div className="mb-6">
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Udført den:</label>
                <span className="text-lg font-medium">
                  {new Date(project.project_date).toLocaleDateString('da-DK', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-white/40 mb-1">Rum / Kategori:</label>
                <span className="inline-block mt-2 px-4 py-1.5 bg-blue-600/20 text-blue-400 border border-blue-400/30 rounded-full text-sm font-medium">
                  {project.room_name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Gallery Section */}
      <div className="mt-16">
        <h3 className="text-2xl font-bold mb-8">Projekt Galleri</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {project.images.map((url, i) => (
            <div 
              key={i} 
              className="group aspect-[4/3] relative overflow-hidden rounded-xl bg-[#121b33] cursor-pointer border border-white/5"
              onClick={() => setIndex(i)}
            >
              <img 
                src={url} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:brightness-110" 
                alt={`${project.title} - billede ${i + 1}`} 
              />
            </div>
          ))}
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