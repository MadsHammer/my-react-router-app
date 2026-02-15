interface SidebarProps {
  rooms: string[];
  selectedRoom: string | null;
  onSelectRoom: (room: string | null) => void;
}

export function Sidebar({ rooms, selectedRoom, onSelectRoom }: SidebarProps) {
  // Shared button styles to keep the code clean
  const baseButtonStyles = "relative text-start px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 group cursor-pointer";
  const activeStyles = "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]";
  const inactiveStyles = "text-white/50 hover:bg-white/5 hover:text-white";

  return (
    <div className="bg-secondary rounded-2xl p-6 border border-white/5 shadow-2xl h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-8 px-2">
        <div className="w-1 h-5 bg-primary rounded-full"></div>
        <h3 className="text-sm uppercase tracking-[0.2em] font-black text-white/90">Filtrer rum</h3>
      </div>
      
      <div className="flex flex-col gap-2">
        {/* 'Alle rum' button */}
        <button 
          className={`${baseButtonStyles} ${selectedRoom === null ? activeStyles : inactiveStyles}`}
          onClick={() => onSelectRoom(null)}
        >
          {selectedRoom === null && (
            <span ></span>
          )}
          Alle rum
        </button>

        {/* Dynamic room buttons */}
        {rooms.map(room => (
          <button 
            key={room} 
            className={`${baseButtonStyles} ${selectedRoom === room ? activeStyles : inactiveStyles}`}
            onClick={() => onSelectRoom(room)}
          >
            {selectedRoom === room && (
              <span></span>
            )}
            {room}
          </button>
        ))}
      </div>

      {/* Subtle bottom decoration */}
      <div className="mt-8 pt-6 border-t border-white/5">
        <p className="text-[10px] text-white/20 uppercase tracking-widest text-center">
            Hammershøj

        </p>
      </div>
    </div>
  );
}