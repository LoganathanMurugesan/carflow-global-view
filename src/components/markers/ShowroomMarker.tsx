
interface MarkerProps {
  isSelected: boolean;
}

const ShowroomMarker = ({ isSelected }: MarkerProps) => {
  return (
    <div className={`relative flex items-center justify-center ${isSelected ? 'z-10' : ''}`}>
      <div className={`w-5 h-5 ${isSelected ? 'w-6 h-6' : ''} bg-[#00ffcc] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(0,255,204,0.6)]`}>
        <div className="w-2 h-2 bg-[#0b1420] rounded-full"></div>
      </div>
      {isSelected && (
        <div className="absolute -inset-1 rounded-full border-2 border-[#00ffcc] animate-pulse"></div>
      )}
    </div>
  );
};

export default ShowroomMarker;
