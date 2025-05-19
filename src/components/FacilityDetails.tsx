
import { Badge } from '@/components/ui/badge';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { Facility, FacilityType } from '../types/supply-chain';

interface FacilityDetailsProps {
  facility: Facility;
}

const getFacilityTypeColor = (type: FacilityType): string => {
  switch (type) {
    case FacilityType.MANUFACTURING:
      return 'bg-[#ffd700]/20 text-[#ffd700] border-[#ffd700]/50';
    case FacilityType.DISTRIBUTION:
      return 'bg-[#0ec1eb]/20 text-[#0ec1eb] border-[#0ec1eb]/50';
    case FacilityType.SHOWROOM:
      return 'bg-[#00ffcc]/20 text-[#00ffcc] border-[#00ffcc]/50';
    case FacilityType.SUPPLIER:
      return 'bg-[#ff8a00]/20 text-[#ff8a00] border-[#ff8a00]/50';
    case FacilityType.BUYER:
      return 'bg-[#ff5d5d]/20 text-[#ff5d5d] border-[#ff5d5d]/50';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const FacilityDetails = ({ facility }: FacilityDetailsProps) => {
  const headerColor = () => {
    switch (facility.type) {
      case FacilityType.MANUFACTURING:
        return 'border-[#ffd700]/30 text-[#ffd700]';
      case FacilityType.DISTRIBUTION:
        return 'border-[#0ec1eb]/30 text-[#0ec1eb]';
      case FacilityType.SHOWROOM:
        return 'border-[#00ffcc]/30 text-[#00ffcc]';
      case FacilityType.SUPPLIER:
        return 'border-[#ff8a00]/30 text-[#ff8a00]';
      case FacilityType.BUYER:
        return 'border-[#ff5d5d]/30 text-[#ff5d5d]';
      default:
        return 'border-gray-600 text-gray-300';
    }
  };
  
  return (
    <div className="space-y-6 text-[#e1e1e6]">
      {/* Facility header - styled as in the reference image */}
      <div className={`border-2 border-t-0 border-l-0 border-r-0 pb-3 ${headerColor()}`}>
        <div className="mb-2">
          <Badge className={`uppercase px-3 py-1 font-bold ${getFacilityTypeColor(facility.type)} border`}>
            {facility.name.split(' ')[0]}
          </Badge>
        </div>
        <div className="flex flex-col space-y-1">
          <h2 className="text-xl font-semibold uppercase">{facility.name}</h2>
          <p className="text-sm font-mono opacity-80">
            ID: {facility.id}
          </p>
        </div>
      </div>

      {/* Location info with modern cyberpunk styling */}
      <div className="grid grid-cols-1 gap-2">
        <div className="flex space-x-2 items-start">
          <div className="mt-1 text-[#0ec1eb]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-sm">{facility.details.address}</p>
        </div>
        
        {facility.details.manager && (
          <div className="flex space-x-2 items-start">
            <div className="mt-1 text-[#0ec1eb]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <p className="text-sm">{facility.details.manager}</p>
          </div>
        )}
        
        {/* Hours of operations - sample data for visual effect */}
        {facility.type === FacilityType.DISTRIBUTION && (
          <div className="flex space-x-2 items-start">
            <div className="mt-1 text-[#0ec1eb]">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-sm">07:00AM - 10:00PM</p>
          </div>
        )}
      </div>

      {/* Metrics section */}
      <div className="border-t border-[#0ec1eb]/20 pt-4 space-y-4">
        {/* Metric circles for analytics */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#1a2d3d] stroke-[2]"></circle>
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none"
                  strokeDasharray="100" 
                  strokeDashoffset={100 - (facility.details.inventory && facility.details.capacity ? Math.min(100, (facility.details.inventory / facility.details.capacity) * 100) : 65)} 
                  className="stroke-[#0ec1eb] stroke-[2]"
                ></circle>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#0ec1eb" className="text-xs font-bold">
                  {facility.details.inventory && facility.details.capacity ? Math.min(100, Math.round((facility.details.inventory / facility.details.capacity) * 100)) : 65}%
                </text>
              </svg>
            </div>
            <p className="text-xs uppercase mt-1 text-[#0ec1eb]">Planning</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#1a2d3d] stroke-[2]"></circle>
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none"
                  strokeDasharray="100" 
                  strokeDashoffset="50" 
                  className="stroke-[#00ffcc] stroke-[2]"
                ></circle>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#00ffcc" className="text-xs font-bold">
                  50%
                </text>
              </svg>
            </div>
            <p className="text-xs uppercase mt-1 text-[#00ffcc]">Sales</p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="relative w-16 h-16">
              <svg viewBox="0 0 36 36" className="w-16 h-16 transform -rotate-90">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-[#1a2d3d] stroke-[2]"></circle>
                <circle 
                  cx="18" cy="18" r="16" 
                  fill="none"
                  strokeDasharray="100" 
                  strokeDashoffset="24" 
                  className="stroke-[#ffd700] stroke-[2]"
                ></circle>
                <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#ffd700" className="text-xs font-bold">
                  76%
                </text>
              </svg>
            </div>
            <p className="text-xs uppercase mt-1 text-[#ffd700]">Sourcing</p>
          </div>
        </div>

        {/* Inventory section */}
        {facility.details.capacity && facility.details.inventory && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-xs uppercase text-[#0ec1eb]">
                {facility.type === FacilityType.DISTRIBUTION ? "Warehouse & Distribution" : "Inventory"}
              </p>
              <p className="text-xs">{facility.details.inventory.toLocaleString()} / {facility.details.capacity.toLocaleString()}</p>
            </div>
            <div className="w-full h-2 bg-[#1a2d3d] rounded-sm overflow-hidden">
              <div
                className="h-full bg-[#ff5d5d]"
                style={{
                  width: `${Math.min(100, (facility.details.inventory / facility.details.capacity) * 100)}%`,
                }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="w-full py-2 bg-[#0ec1eb]/10 hover:bg-[#0ec1eb]/20 text-[#0ec1eb] border border-[#0ec1eb]/30 rounded-sm text-sm font-medium transition-colors uppercase">
              Details
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#0b1420] border border-[#0ec1eb]/30 text-[#e1e1e6]">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#0ec1eb]">Facility Details</h4>
              <p className="text-xs">View comprehensive analytics and management options for this facility.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
        
        <HoverCard>
          <HoverCardTrigger asChild>
            <button className="w-full py-2 bg-[#00ffcc]/10 hover:bg-[#00ffcc]/20 text-[#00ffcc] border border-[#00ffcc]/30 rounded-sm text-sm font-medium transition-colors uppercase">
              Operations
            </button>
          </HoverCardTrigger>
          <HoverCardContent className="w-80 bg-[#0b1420] border border-[#00ffcc]/30 text-[#e1e1e6]">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-[#00ffcc]">Operations Control</h4>
              <p className="text-xs">Access real-time operations management and supply chain controls.</p>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default FacilityDetails;
