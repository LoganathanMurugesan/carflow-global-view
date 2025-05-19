
import { ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GraphControlsProps {
  zoomLevel: number;
  onZoomChange: (level: number) => void;
}

const GraphControls = ({ zoomLevel, onZoomChange }: GraphControlsProps) => {
  const handleZoomIn = () => {
    onZoomChange(Math.min(zoomLevel + 0.2, 3));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoomLevel - 0.2, 0.5));
  };

  const handleReset = () => {
    onZoomChange(1);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomIn}
        className="bg-[#121a2b] border-[#0ec1eb]/30 text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
      >
        <ZoomIn size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleZoomOut}
        className="bg-[#121a2b] border-[#0ec1eb]/30 text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
      >
        <ZoomOut size={16} />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleReset}
        className="bg-[#121a2b] border-[#0ec1eb]/30 text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
      >
        <Move size={16} />
        <span className="text-xs">Reset</span>
      </Button>
      <div className="text-[#0ec1eb] text-xs ml-2">
        Zoom: {Math.round(zoomLevel * 100)}%
      </div>
    </div>
  );
};

export default GraphControls;
