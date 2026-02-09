// app/components/SortControls.tsx
interface SortProps {
  sortOrder: 'newest' | 'oldest';
  setSortOrder: (order: 'newest' | 'oldest') => void;
}

export function SortControls({ sortOrder, setSortOrder }: SortProps) {
  return (
    <div className="d-flex justify-content-between align-items-center mb-4 p-3">
      <h2 className="text-white h4 mb-0">Mine Projekter</h2>
      <div className="btn-group shadow-sm">
        <button 
          className={`btn btn-sm ${sortOrder === 'newest' ? 'btn-primary' : 'btn-outline-primary text-white'}`}
          onClick={() => setSortOrder('newest')}
        >
          Nyeste først
        </button>
        <button 
          className={`btn btn-sm ${sortOrder === 'oldest' ? 'btn-primary' : 'btn-outline-primary text-white'}`}
          onClick={() => setSortOrder('oldest')}
        >
          Ældste først
        </button>
      </div>
    </div>
  );
}