
import { Facility, FacilityType } from '../../types/supply-chain';
import ManufacturingMarker from './ManufacturingMarker';
import DistributionMarker from './DistributionMarker';
import ShowroomMarker from './ShowroomMarker';
import SupplierMarker from './SupplierMarker';
import BuyerMarker from './BuyerMarker';

interface FacilityMarkerProps {
  facility: Facility;
  isSelected: boolean;
  onClick: () => void;
}

const FacilityMarker = ({ facility, isSelected, onClick }: FacilityMarkerProps) => {
  const renderMarker = () => {
    switch (facility.type) {
      case FacilityType.MANUFACTURING:
        return <ManufacturingMarker isSelected={isSelected} />;
      case FacilityType.DISTRIBUTION:
        return <DistributionMarker isSelected={isSelected} />;
      case FacilityType.SHOWROOM:
        return <ShowroomMarker isSelected={isSelected} />;
      case FacilityType.SUPPLIER:
        return <SupplierMarker isSelected={isSelected} />;
      case FacilityType.BUYER:
        return <BuyerMarker isSelected={isSelected} />;
      default:
        return <div className="w-4 h-4 bg-gray-500 rounded-full"></div>;
    }
  };

  return (
    <div 
      className={`cursor-pointer transform transition-transform ${isSelected ? 'scale-125 z-10' : 'hover:scale-110'}`} 
      onClick={onClick}
    >
      {renderMarker()}
      {isSelected && (
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-[#0b1420]/90 border border-[#0ec1eb]/50 px-2 py-1 rounded-md text-xs font-medium text-[#0ec1eb] shadow-[0_0_8px_rgba(14,193,235,0.3)]">
          {facility.name}
        </div>
      )}
    </div>
  );
};

export default FacilityMarker;
