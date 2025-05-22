
import { ZoomIn, ZoomOut, Move, Settings, Save, FileDigit, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useEffect, useState } from 'react';

interface GraphControlsProps {
  zoomLevel: number;
  onZoomChange: (level: number) => void;
  onViewReset?: () => void;
  onSaveView?: () => void;
  onExportGraph?: (format: string) => void;
}

const GraphControls = ({ 
  zoomLevel, 
  onZoomChange, 
  onViewReset, 
  onSaveView,
  onExportGraph
}: GraphControlsProps) => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleZoomIn = () => {
    onZoomChange(Math.min(zoomLevel + 0.2, 3));
  };

  const handleZoomOut = () => {
    onZoomChange(Math.max(zoomLevel - 0.2, 0.5));
  };

  const handleReset = () => {
    onZoomChange(1);
    if (onViewReset) onViewReset();
  };

  const handleSaveView = () => {
    if (onSaveView) {
      onSaveView();
    } else {
      toast.success("View saved successfully!");
    }
  };

  const handleExportGraph = (format: string) => {
    if (onExportGraph) {
      onExportGraph(format);
    } else {
      toast.success(`Graph exported as ${format.toUpperCase()}`);
    }
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    toast.success(`Switched to ${isDarkMode ? 'light' : 'dark'} mode`);
    // Here you would actually change the theme
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.ctrlKey && e.key === '-') {
        e.preventDefault();
        handleZoomOut();
      } else if (e.ctrlKey && e.key === '0') {
        e.preventDefault();
        handleReset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomLevel]);

  return (
    <div className="flex items-center gap-2">
      <div className="bg-[#0b1420]/80 border border-[#0ec1eb]/30 rounded-md p-1 flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomIn}
          className="text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
          title="Zoom In (Ctrl +)"
        >
          <ZoomIn size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleZoomOut}
          className="text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
          title="Zoom Out (Ctrl -)"
        >
          <ZoomOut size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleReset}
          className="text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
          title="Reset View (Ctrl 0)"
        >
          <Move size={16} />
        </Button>
        <div className="text-[#0ec1eb] text-xs mx-1 min-w-12 text-center">
          {Math.round(zoomLevel * 100)}%
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="bg-[#121a2b] border-[#0ec1eb]/30 text-[#0ec1eb] hover:bg-[#182338] hover:text-[#00ffcc]"
          >
            <Settings size={16} className="mr-1" />
            <span className="text-xs">Options</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-[#0b1420] border-[#0ec1eb]/30 text-[#0ec1eb]">
          <DropdownMenuItem onClick={handleSaveView}>
            <Save size={14} className="mr-2" />
            <span>Save Current View</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExportGraph("png")}>
            <FileDigit size={14} className="mr-2" />
            <span>Export as PNG</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleExportGraph("json")}>
            <Download size={14} className="mr-2" />
            <span>Export as JSON</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleTheme}>
            <Settings size={14} className="mr-2" />
            <span>Toggle Theme</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default GraphControls;
