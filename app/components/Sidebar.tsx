interface SidebarProps {
  rooms: string[];
  selectedRoom: string | null;
  onSelectRoom: (room: string | null) => void;
}

export function Sidebar({ rooms, selectedRoom, onSelectRoom }: SidebarProps) {
  return (
    <div className="bg-darkblue col-lg-3 shadow-sm rounded pt-4 pb-4 px-3 mb-4">
      <h3 className="h5 text-white mb-3">Filtrer rum</h3>
      <div className="nav flex-column nav-pills">
        <button 
          className={`nav-link text-start mb-2 ${selectedRoom === null ? 'active' : ''}`}
          onClick={() => onSelectRoom(null)}
        >
          Alle rum
        </button>
        {rooms.map(room => (
          <button 
            key={room} 
            className={`nav-link text-start mb-2 ${selectedRoom === room ? 'active' : ''}`}
            onClick={() => onSelectRoom(room)}
          >
            {room}
          </button>
        ))}
      </div>
    </div>
  );
}