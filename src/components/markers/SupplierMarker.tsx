
interface MarkerProps {
  isSelected: boolean;
}

const SupplierMarker = ({ isSelected }: MarkerProps) => {
  return (
    <div className={`relative flex items-center justify-center ${isSelected ? 'z-10' : ''}`}>
      <div className={`w-5 h-5 ${isSelected ? 'w-6 h-6' : ''} bg-[#ff8a00] rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(255,138,0,0.6)]`}>
        <div className="w-2 h-2 bg-[#0b1420] rounded-full"></div>
      </div>
      {isSelected && (
        <div className="absolute -inset-1 rounded-full border-2 border-[#ff8a00] animate-pulse"></div>
      )}
    </div>
  );
};

export default SupplierMarker;
