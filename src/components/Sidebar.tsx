
import { Facility } from '../types/supply-chain';
import FacilityDetails from './FacilityDetails';
import { useEffect, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface SidebarProps {
  selectedFacility: Facility | null;
  onClose: () => void;
}

const Sidebar = ({ selectedFacility, onClose }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(!!selectedFacility);
  }, [selectedFacility]);

  return (
    <div className={`
      fixed md:relative z-10 bg-[#0b1420] border-r border-[#0ec1eb]/30 h-full
      transition-all duration-300 ease-in-out overflow-auto
      ${isOpen ? 'w-80 opacity-100 translate-x-0' : 'w-0 md:w-16 opacity-0 md:opacity-100 -translate-x-full md:translate-x-0'}
    `}>
      {/* Collapse button when sidebar is open */}
      {isOpen && (
        <button 
          onClick={() => {
            setIsOpen(false);
            onClose();
          }} 
          className="absolute top-3 right-3 p-1 rounded-full hover:bg-[#0ec1eb]/10"
        >
          <X className="h-5 w-5 text-[#0ec1eb]" />
        </button>
      )}
      
      {/* Content when open */}
      {isOpen && selectedFacility && (
        <div className="p-5">
          <FacilityDetails facility={selectedFacility} />
        </div>
      )}
      
      {/* Collapsed state */}
      {!isOpen && (
        <div className="hidden md:flex flex-col items-center pt-6 space-y-8">
          <div className="rounded-full bg-[#0ec1eb]/20 p-2 border border-[#0ec1eb]/30">
            <ArrowRight className="h-4 w-4 text-[#0ec1eb]" />
          </div>
          <div className="text-xs text-[#0ec1eb]/70 font-medium -rotate-90 whitespace-nowrap">
            DETAILS
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
