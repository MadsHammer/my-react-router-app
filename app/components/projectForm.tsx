import { Form } from "react-router";

export function ProjectForm({ initialData, isSubmitting }: { initialData?: any, isSubmitting: boolean }) {
  // Common styling for our inputs
  const inputClasses = "block w-full bg-secondary border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all";

  return (
    <Form method="post" encType="multipart/form-data" className="space-y-8 animate-fade-in">
      
      {/* Basic Info Section */}
      <div className="space-y-4">
        <label className="block text-xs uppercase tracking-widest text-white/40 font-bold ml-1">
          Projekt Information
        </label>
        <input 
          name="title" 
          defaultValue={initialData?.title} 
          placeholder="Projekt navn (f.eks. Nyt Badeværelse i Sorø)" 
          className={inputClasses} 
          required
        />
        <textarea 
          name="description" 
          defaultValue={initialData?.description} 
          placeholder="Beskriv projektet, materialer brugt, osv." 
          className={`${inputClasses} min-h-[150px] resize-y`}
          required
        />
      </div>

      {/* Image Upload Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Before Image Slot */}
        <div className="group space-y-3">
          <label className="block text-xs uppercase tracking-widest text-white/40 font-bold ml-1">
            Før Billede
          </label>
          <div className="relative border-2 border-dashed border-white/10 rounded-2xl p-6 bg-secondary/50 group-hover:border-primary/50 transition-colors text-center">
            {initialData?.before_url && (
              <img src={initialData.before_url} className="h-40 w-full object-cover rounded-lg mb-4 border border-white/5" alt="Preview før" />
            )}
            <input 
              type="file" 
              name="before_image" 
              accept="image/*" 
              className="text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* After Image Slot */}
        <div className="group space-y-3">
          <label className="block text-xs uppercase tracking-widest text-primary/60 font-bold ml-1">
            Efter Billede
          </label>
          <div className="relative border-2 border-dashed border-primary/10 rounded-2xl p-6 bg-primary/5 group-hover:border-primary/50 transition-colors text-center">
            {initialData?.after_url && (
              <img src={initialData.after_url} className="h-40 w-full object-cover rounded-lg mb-4 border border-primary/20" alt="Preview efter" />
            )}
            <input 
              type="file" 
              name="after_image" 
              accept="image/*" 
              className="text-sm text-white/60 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4 border-t border-white/5">
        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full md:w-auto bg-primary hover:bg-primary-hover disabled:bg-white/10 disabled:text-white/20 text-white font-bold px-10 py-4 rounded-xl transition-all shadow-lg shadow-primary/20 active:scale-95 flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              Gemmer...
            </>
          ) : (
            "Gem Projekt"
          )}
        </button>
      </div>
    </Form>
  );
}