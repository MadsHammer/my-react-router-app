// app/components/SortControls.tsx
interface SortProps {
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (order: 'newest' | 'oldest') => void;
}

export function SortControls({ sortOrder, setSortOrder }: SortProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 px-2 gap-4">
      <h2 className="text-white text-2xl font-bold tracking-tight">Mine Projekter</h2>
      
      {/* Custom Toggle Group */}
      <div className="inline-flex p-1 bg-[#121b33] rounded-xl border border-white/5 shadow-inner">
        <button 
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 
            ${sortOrder === 'newest' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-white/40 hover:text-white/70'}`}
          onClick={() => setSortOrder('newest')}
        >
          Nyeste
        </button>
        <button 
          className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 
            ${sortOrder === 'oldest' 
              ? 'bg-blue-600 text-white shadow-md' 
              : 'text-white/40 hover:text-white/70'}`}
          onClick={() => setSortOrder('oldest')}
        >
          Ældste
        </button>
      </div>
    </div>
  );
}