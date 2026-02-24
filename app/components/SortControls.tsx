// app/components/SortControls.tsx
interface SortProps {
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (order: 'newest' | 'oldest') => void;
  projects: any[];
}

export function SortControls({ sortOrder, setSortOrder, projects }: SortProps) {
  const toggleBtnBase = "px-6 py-2 rounded-lg text-[12px] font-bold tracking-[0.15em] transition-all duration-300";
  const activeToggle = "bg-primary text-white shadow-lg shadow-primary/20";
  const inactiveToggle = "text-white/30 hover:text-white/60";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 px-4 sm:px-0 gap-6">
      {/* Venstre side: Titel og tæller */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <h2 className="text-white text-3xl font-bold tracking-tighter uppercase">
            Projekter
          </h2>
        </div>
        
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="text-primary text-[12px] font-black tracking-widest">
            {projects.length}
          </span>
        </div>
      </div>
      
      {/* Højre side: Sorterings-knapper */}
      <div className="inline-flex p-1.5 bg-secondary rounded-2xl border border-white/5 shadow-2xl">
        <button 
          className={`cursor-pointer ${toggleBtnBase} ${sortOrder === 'newest' ? activeToggle : inactiveToggle}`}
          onClick={() => setSortOrder('newest')}
        >
          Nyeste
        </button>
        <button 
          className={`cursor-pointer ${toggleBtnBase} ${sortOrder === 'oldest' ? activeToggle : inactiveToggle}`}
          onClick={() => setSortOrder('oldest')}
        >
          Ældste
        </button>
      </div>
    </div>
  );
}
}
