
import { X } from 'lucide-react';
import { Facility, FacilityType } from '@/types/supply-chain';

interface NodeDetailsPanelProps {
  details: Facility;
  position: { x: number; y: number };
  onClose: () => void;
}

const getTypeLabel = (type: FacilityType): string => {
  switch (type) {
    case FacilityType.MANUFACTURING:
      return 'Manufacturing';
    case FacilityType.DISTRIBUTION:
      return 'Distribution';
    case FacilityType.SHOWROOM:
      return 'Showroom';
    case FacilityType.SUPPLIER:
      return 'Supplier';
    case FacilityType.BUYER:
      return 'Buyer';
    default:
      return 'Unknown';
  }
};

const NodeDetailsPanel = ({ details, position, onClose }: NodeDetailsPanelProps) => {
  if (!details) return null;

  return (
    <div 
      className="absolute z-50 w-80 bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md shadow-[0_0_20px_rgba(14,193,235,0.15)] backdrop-blur-sm"
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        maxHeight: 'calc(100vh - 8rem)'
      }}
    >
      <div className="p-4 overflow-auto max-h-[calc(100vh-8rem)]">
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 text-[#0ec1eb] hover:text-[#00ffcc] transition-colors"
        >
          <X size={18} />
        </button>
        
        <h3 className="text-[#0ec1eb] font-semibold text-lg pb-1 border-b border-[#0ec1eb]/30 mb-3">
          {details.name}
        </h3>
        
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between text-white">
            <span className="text-[#0ec1eb]/70">Type:</span>
            <span className="font-medium">{getTypeLabel(details.type)}</span>
          </div>
          
          <div className="flex items-center justify-between text-white">
            <span className="text-[#0ec1eb]/70">Location:</span>
            <span className="font-medium">{details.latitude.toFixed(4)}, {details.longitude.toFixed(4)}</span>
          </div>
          
          {details.details?.address && (
            <div className="flex items-center justify-between text-white">
              <span className="text-[#0ec1eb]/70">Address:</span>
              <span className="font-medium text-right">{details.details.address}</span>
            </div>
          )}
          
          {details.details?.manager && (
            <div className="flex items-center justify-between text-white">
              <span className="text-[#0ec1eb]/70">Manager:</span>
              <span className="font-medium">{details.details.manager}</span>
            </div>
          )}
          
          {details.details?.established && (
            <div className="flex items-center justify-between text-white">
              <span className="text-[#0ec1eb]/70">Established:</span>
              <span className="font-medium">{new Date(details.details.established).toLocaleDateString()}</span>
            </div>
          )}
          
          {details.details?.capacity && (
            <div className="flex items-center justify-between text-white">
              <span className="text-[#0ec1eb]/70">Capacity:</span>
              <span className="font-medium">{details.details.capacity.toLocaleString()}</span>
            </div>
          )}
          
          {details.details?.inventory && (
            <div className="flex items-center justify-between text-white">
              <span className="text-[#0ec1eb]/70">Inventory:</span>
              <span className="font-medium">{details.details.inventory.toLocaleString()}</span>
            </div>
          )}
          
          {details.details?.specialization && (
            <div className="flex items-center justify-between text-white">
              <span className="text-[#0ec1eb]/70">Specialization:</span>
              <span className="font-medium">{details.details.specialization}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NodeDetailsPanel;
