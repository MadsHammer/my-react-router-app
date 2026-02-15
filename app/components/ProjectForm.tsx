import { useState, type ChangeEvent } from "react";
import { useSubmit } from "react-router";
import imageCompression from 'browser-image-compression';
import { supabase } from "~/lib/supabase";


interface ImagePreview {
  id: string;
  url: string;
  file: File;
  type: 'before' | 'after';
}

export function ProjectForm({ 
  initialData, 
  isSubmitting, 
  rooms 
}: { 
  initialData?: any, 
  isSubmitting: boolean,
  rooms: string[] 
}) {
  const [images, setImages] = useState<ImagePreview[]>([]);
  const [featuredId, setFeaturedId] = useState<string | null>(null);
  const [isCompressing, setIsCompressing] = useState(false); // Ny state til komprimering
  const submit = useSubmit();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, type: 'before' | 'after') => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        url: URL.createObjectURL(file),
        file,
        type
      }));
      setImages(prev => [...prev, ...newFiles]);
      if (!featuredId && newFiles.length > 0) setFeaturedId(newFiles[0].id);
    }
  };

  const removeImage = (id: string) => {
    setImages(prev => prev.filter(img => img.id !== id));
    if (featuredId === id) setFeaturedId(null);
  };

  // GJORT ASYNC FOR AT KUNNE BRUGE AWAIT
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsCompressing(true);
  
  const formData = new FormData(e.currentTarget);
  formData.delete("before_images");
  formData.delete("after_images");

  try {
    let featuredIndex = 0;

    // Vi uploader billederne Ét efter Ét direkte til Supabase
    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      
      // 1. Komprimering (valgfrit men godt for pladsen)
      const compressedFile = await imageCompression(img.file, {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
      });

      // 2. Upload direkte til Supabase Storage
      const fileName = `${Date.now()}-${img.id}-${img.type}.jpg`;
      const { data, error } = await supabase.storage
  .from('images') // <--- Tjek at dette ord matcher navnet på din bucket 100% (små bogstaver)
  .upload(fileName, compressedFile, {
    upsert: true // Meget vigtigt!
  });
      if (error) throw error;

      // 3. I stedet for selve filen, sender vi nu kun STIEN til vores action
      const fieldName = img.type === 'before' ? 'before_paths' : 'after_paths';
      formData.append(fieldName, data.path);
      
      if (img.id === featuredId) {
        featuredIndex = i;
      }
    }

    formData.append("featured_index", featuredIndex.toString());

    // Nu sender vi formData, som KUN indeholder tekst (stier), ikke tunge filer!
    // Det fylder kun få KB, så Vercel fejler aldrig med 413.
    submit(formData, { method: "post" });

  } catch (err) {
    console.error("Upload fejl:", err);
    alert("Fejl ved upload af billeder.");
  } finally {
    setIsCompressing(false);
  }
};

  const inputClasses = "block w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none";
  const labelClasses = "block text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold ml-1 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-10 animate-fade-in">
      {/* 1. Basic Info */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClasses}>Projekt Navn</label>
            <input name="title" defaultValue={initialData?.title} placeholder="F.eks. Nyt sildebensparket i stuen" className={inputClasses} required />
          </div>
          
          <div>
            <label className={labelClasses}>Vælg Rum</label>
            <div className="relative">
              <select name="room_name" className={inputClasses} required>
                {rooms.map(room => (
                  <option key={room} value={room} className="bg-secondary text-white">{room}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className={labelClasses}>Dato</label>
            <input type="date" name="project_date" defaultValue={new Date().toISOString().split('T')[0]} className={inputClasses} required />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Beskrivelse</label>
          <textarea name="description" placeholder="Beskriv opgaven..." className={`${inputClasses} min-h-[100px]`} required />
        </div>
      </div>

      {/* 2. Featured Image Preview */}
      <div className="space-y-3">
        <label className={labelClasses}>Valgt Forsidebillede (Klik på et billede nedenfor)</label>
        <div className="relative h-72 w-full rounded-3xl border-2 border-dashed border-white/5 bg-secondary/30 overflow-hidden flex items-center justify-center">
          {featuredId ? (
            <img 
              src={images.find(img => img.id === featuredId)?.url} 
              className="w-full h-full object-cover animate-fade-in" 
              alt="Featured" 
            />
          ) : (
            <div className="text-center opacity-20 italic">Ingen billede valgt</div>
          )}
        </div>
      </div>

      {/* 3. Image Grids */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4">
          <label className={labelClasses}>Før Billeder</label>
          <div className="grid grid-cols-2 gap-3">
            {images.filter(img => img.type === 'before').map((img) => (
              <div 
                key={img.id} 
                onClick={() => setFeaturedId(img.id)}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${featuredId === img.id ? 'border-primary ring-4 ring-primary/20' : 'border-transparent'}`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(img.id); }} className="absolute top-1 right-1 bg-black/60 rounded-full w-6 h-6 text-white text-xs hover:bg-red-500">✕</button>
              </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/5">
              <span className="text-white/20 text-2xl">+</span>
              <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'before')} />
            </label>
          </div>
        </div>

        <div className="space-y-4">
          <label className={`${labelClasses} text-primary/60`}>Efter Billeder</label>
          <div className="grid grid-cols-2 gap-3">
            {images.filter(img => img.type === 'after').map((img) => (
              <div 
                key={img.id} 
                onClick={() => setFeaturedId(img.id)}
                className={`relative aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${featuredId === img.id ? 'border-primary ring-4 ring-primary/20' : 'border-transparent'}`}
              >
                <img src={img.url} className="w-full h-full object-cover" alt="Preview" />
                <button type="button" onClick={(e) => { e.stopPropagation(); removeImage(img.id); }} className="absolute top-1 right-1 bg-black/60 rounded-full w-6 h-6 text-white text-xs hover:bg-red-500">✕</button>
              </div>
            ))}
            <label className="aspect-square rounded-xl border-2 border-dashed border-primary/10 flex items-center justify-center cursor-pointer hover:bg-primary/5">
              <span className="text-primary/30 text-2xl">+</span>
              <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => handleFileChange(e, 'after')} />
            </label>
          </div>
        </div>
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting || isCompressing || images.length === 0 || !featuredId}
        className="w-full bg-primary py-5 rounded-2xl font-black uppercase text-white shadow-xl shadow-primary/20 hover:scale-[1.01] transition-all disabled:opacity-20"
      >
        {isCompressing ? "Komprimerer..." : isSubmitting ? "Gemmer Projekt..." : "Gem Projekt"}
      </button>
    </form>
  );
}