
import { FacilityType } from '@/types/supply-chain';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const GraphLegend = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showInteractionsHelp, setShowInteractionsHelp] = useState(true);

  const nodeTypes = [
    { type: FacilityType.MANUFACTURING, label: 'Manufacturing', color: '#F97316', shape: 'ellipse' },
    { type: FacilityType.DISTRIBUTION, label: 'Distribution', color: '#33C3F0', shape: 'diamond' },
    { type: FacilityType.SHOWROOM, label: 'Showroom', color: '#9b87f5', shape: 'round-rectangle' },
    { type: FacilityType.SUPPLIER, label: 'Supplier', color: '#FFC857', shape: 'hexagon' },
    { type: FacilityType.BUYER, label: 'Buyer', color: '#E07A5F', shape: 'pentagon' },
  ];

  const edgeTypes = [
    { status: 'in-transit', label: 'In Transit', color: '#00ffcc' },
    { status: 'completed', label: 'Completed', color: '#9b87f5' },
    { status: 'scheduled', label: 'Scheduled', color: '#0ec1eb' },
  ];

  const renderShape = (shape: string, color: string) => {
    switch(shape) {
      case 'ellipse':
        return <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color, border: '1px solid white' }}></div>;
      case 'diamond':
        return <div className="w-6 h-6 rotate-45" style={{ backgroundColor: color, border: '1px solid white' }}></div>;
      case 'round-rectangle':
        return <div className="w-6 h-6 rounded-md" style={{ backgroundColor: color, border: '1px solid white' }}></div>;
      case 'hexagon':
        return (
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div style={{ backgroundColor: color, border: '1px solid white' }} className="w-full h-5 clip-hexagon"></div>
          </div>
        );
      case 'pentagon':
        return (
          <div className="relative w-6 h-6 flex items-center justify-center">
            <div style={{ backgroundColor: color, border: '1px solid white' }} className="w-full h-5 clip-pentagon"></div>
          </div>
        );
      default:
        return <div className="w-6 h-6 rounded-full" style={{ backgroundColor: color, border: '1px solid white' }}></div>;
    }
  };

  return (
    <div className="bg-[#0b1420]/95 border border-[#0ec1eb]/30 rounded-md p-4 h-full overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#0ec1eb] font-semibold text-sm">Legend</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-6 w-6 p-0"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? <ChevronUp size={16} className="text-[#0ec1eb]" /> : <ChevronDown size={16} className="text-[#0ec1eb]" />}
        </Button>
      </div>
      
      {isExpanded && (
        <div className="space-y-4">
          <div>
            <h4 className="text-white text-xs uppercase tracking-wider mb-2">Nodes</h4>
            <div className="space-y-2">
              {nodeTypes.map((item) => (
                <div key={item.type} className="flex items-center gap-2">
                  {renderShape(item.shape, item.color)}
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
                  <div className="w-6 h-1" style={{ backgroundColor: item.color }}></div>
                  <span className="text-white text-sm">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          {showInteractionsHelp && (
            <div className="pt-4 border-t border-[#0ec1eb]/30">
              <div className="flex items-center justify-between">
                <h4 className="text-white text-xs uppercase tracking-wider mb-2">Interactions</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => setShowInteractionsHelp(!showInteractionsHelp)}
                >
                  <HelpCircle size={14} className="text-[#0ec1eb]" />
                </Button>
              </div>
              
              <ul className="list-disc list-inside space-y-1 text-xs text-[#0ec1eb]/70">
                <li>Click node to view details</li>
                <li>Right-click for context menu</li>
                <li>Drag nodes to reposition</li>
                <li>Drag background to pan</li>
                <li>Use zoom controls to zoom in/out</li>
                <li>Press '/' for command palette</li>
                <li>Use filters to show/hide elements</li>
              </ul>
              
              <div className="mt-3 text-xs text-[#0ec1eb]/70">
                <div className="font-medium">Keyboard Shortcuts:</div>
                <div className="grid grid-cols-2 gap-x-2 mt-1">
                  <span>Ctrl +</span>
                  <span>Zoom In</span>
                  <span>Ctrl -</span>
                  <span>Zoom Out</span>
                  <span>Ctrl 0</span>
                  <span>Reset View</span>
                  <span>Esc</span>
                  <span>Close Popups</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GraphLegend;
