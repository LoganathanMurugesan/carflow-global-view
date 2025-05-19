
import { FacilityType } from '@/types/supply-chain';

const GraphLegend = () => {
  const nodeTypes = [
    { type: FacilityType.MANUFACTURING, label: 'Manufacturing', color: '#ff8c42' },
    { type: FacilityType.DISTRIBUTION, label: 'Distribution', color: '#0ec1eb' },
    { type: FacilityType.SHOWROOM, label: 'Showroom', color: '#9b87f5' },
    { type: FacilityType.SUPPLIER, label: 'Supplier', color: '#00ffcc' },
    { type: FacilityType.BUYER, label: 'Buyer', color: '#e5deff' },
  ];

  const edgeTypes = [
    { status: 'in-transit', label: 'In Transit', color: '#00ffcc' },
    { status: 'completed', label: 'Completed', color: '#9b87f5' },
    { status: 'scheduled', label: 'Scheduled', color: '#0ec1eb' },
  ];

  return (
    <div className="bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md p-4 h-full">
      <h3 className="text-[#0ec1eb] font-semibold text-sm mb-4">Legend</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-white text-xs uppercase tracking-wider mb-2">Nodes</h4>
          <div className="space-y-2">
            {nodeTypes.map((item) => (
              <div key={item.type} className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-white text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-white text-xs uppercase tracking-wider mb-2">Edges</h4>
          <div className="space-y-2">
            {edgeTypes.map((item) => (
              <div key={item.status} className="flex items-center gap-2">
                <div className="w-6 h-0.5" style={{ backgroundColor: item.color }}></div>
                <span className="text-white text-sm">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="pt-4 border-t border-[#0ec1eb]/30 text-xs text-[#0ec1eb]/70">
          <p className="mb-2">Interactions:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Click node to view details</li>
            <li>Drag nodes to reposition</li>
            <li>Drag background to pan</li>
            <li>Use zoom controls to zoom in/out</li>
            <li>Search to filter nodes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GraphLegend;
