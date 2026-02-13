interface SidebarProps {
  rooms: string[];
  selectedRoom: string | null;
  onSelectRoom: (room: string | null) => void;
}

export function Sidebar({ rooms, selectedRoom, onSelectRoom }: SidebarProps) {
  return (
    // 'lg:col-span-3' if you're using a 12-column grid in the parent
    <div className="bg-[#121b33] rounded-xl p-5 border border-white/5 shadow-xl h-fit">
      <h3 className="text-lg font-bold text-white mb-6 px-2">Filtrer rum</h3>
      
      <div className="flex flex-col gap-1">
        {/* 'Alle rum' button */}
        <button 
          className={`text-start px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
            ${selectedRoom === null 
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
              : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
          onClick={() => onSelectRoom(null)}
        >
          Alle rum
        </button>

        {/* Dynamic room buttons */}
        {rooms.map(room => (
          <button 
            key={room} 
            className={`text-start px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 
              ${selectedRoom === room 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            onClick={() => onSelectRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
}