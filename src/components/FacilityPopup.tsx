
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

  // Calculate position to be next to the marker
  const calculatePosition = () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const bufferSpace = 10; // Space between marker and popup
    
    // Default positions
    let top = mapPosition.y;
    let left = mapPosition.x + bufferSpace;
    let right = 'auto';
    let bottom = 'auto';
    let transform = 'none';
    let arrowClass = 'left-[-8px] top-5 border-r-[#0b1420]/95 border-r-8 border-y-transparent border-y-8 border-l-0';
    
    // If popup would go off right edge of screen, position it to the left of marker
    if (mapPosition.x + 320 > windowWidth) { // 320 = approximate popup width
      left = 'auto';
      right = windowWidth - mapPosition.x + bufferSpace;
      arrowClass = 'right-[-8px] top-5 border-l-[#0b1420]/95 border-l-8 border-y-transparent border-y-8 border-r-0';
    }
    
    // If popup would go off bottom of screen, adjust vertical position
    if (mapPosition.y + 300 > windowHeight) { // 300 = approximate max height
      top = Math.max(20, windowHeight - 320); // Keep it within screen bounds
    }
    
    // If popup would go off top of screen, position it below marker
    if (top < 70) { // Account for header height
      top = 70;
    }
    
    return { top, left, right, bottom, transform, arrowClass };
  };
  
  const { top, left, right, bottom, transform, arrowClass } = calculatePosition();

  return (
    <div 
      ref={popupRef}
      className="fixed z-50 w-80 bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md shadow-[0_0_20px_rgba(14,193,235,0.15)] backdrop-blur-sm"
      style={{ 
        top: typeof top === 'number' ? `${top}px` : top, 
        left: typeof left === 'number' ? `${left}px` : left,
        right: right,
        bottom: bottom,
        transform: transform,
        maxHeight: 'calc(100vh - 8rem)'
      }}
    >
      {/* Arrow pointing to the marker */}
      <div className={`absolute w-0 h-0 pointer-events-none ${arrowClass}`}></div>
      
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
