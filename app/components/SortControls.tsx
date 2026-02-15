// app/components/SortControls.tsx
interface SortProps {
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (order: 'newest' | 'oldest') => void;
}

export function SortControls({ sortOrder, setSortOrder }: SortProps) {
  // Shared button style for the toggle
  const toggleBtnBase = "px-6 py-2 rounded-lg text-[12px] font-bold  tracking-[0.15em] transition-all duration-300";
  const activeToggle = "bg-primary text-white shadow-lg shadow-primary/20";
  const inactiveToggle = "text-white/30 hover:text-white/60";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 px-4 sm:px-0 gap-6">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
        <h2 className="text-white text-3xl font-bold tracking-tighter ">
          Projekter
        </h2>
      </div>
      
      {/* Custom Toggle Group */}
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