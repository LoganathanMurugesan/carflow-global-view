
import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Facility } from '../types/supply-chain';
import FacilityDetails from './FacilityDetails';

interface FacilityPopupProps {
  facility: Facility;
  onClose: () => void;
  mapPosition: { x: number; y: number };
}

const FacilityPopup = ({ facility, onClose, mapPosition }: FacilityPopupProps) => {
  const popupRef = useRef<HTMLDivElement>(null);
  
  // Determine optimal position for popup (left or right)
  const isRightSide = mapPosition.x < window.innerWidth / 2;
  
  // Close when clicking outside of popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div 
      ref={popupRef}
      className={`fixed z-50 w-80 ${isRightSide ? 'right-4' : 'left-4'} top-20 bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md shadow-[0_0_20px_rgba(14,193,235,0.15)] backdrop-blur-sm`}
      style={{ maxHeight: 'calc(100vh - 8rem)' }}
    >
      <div className="p-4 overflow-auto max-h-[calc(100vh-8rem)]">
        <button 
          onClick={onClose}
          className="absolute right-2 top-2 text-[#0ec1eb] hover:text-[#00ffcc] transition-colors"
        >
          <X size={18} />
        </button>
        <FacilityDetails facility={facility} />
      </div>
    </div>
  );
};

export default FacilityPopup;
