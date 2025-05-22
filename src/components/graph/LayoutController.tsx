
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LayoutGrid } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface LayoutControllerProps {
  currentLayout: string;
  onLayoutChange: (layout: string) => void;
  availableLayouts: string[];
}

const LayoutController = ({ currentLayout, onLayoutChange, availableLayouts }: LayoutControllerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible 
      open={isOpen} 
      onOpenChange={setIsOpen}
      className="bg-[#0b1420]/90 border border-[#0ec1eb]/30 rounded-md p-2 w-52"
    >
      <CollapsibleTrigger asChild>
        <Button 
          variant="ghost" 
          className="w-full flex justify-between items-center p-2 text-[#0ec1eb]"
        >
          <div className="flex items-center">
            <LayoutGrid className="w-4 h-4 mr-2" />
            <span className="text-xs font-medium">Graph Layout</span>
          </div>
          <span className="text-xs opacity-70">{currentLayout}</span>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="pt-2">
        <Select value={currentLayout} onValueChange={onLayoutChange}>
          <SelectTrigger className="bg-[#121a2b] border-[#0ec1eb]/30 text-[#0ec1eb]">
            <SelectValue placeholder="Select layout" />
          </SelectTrigger>
          <SelectContent className="bg-[#0b1420] border-[#0ec1eb]/30">
            {availableLayouts.map((layout) => (
              <SelectItem key={layout} value={layout} className="text-[#0ec1eb]">
                {layout.charAt(0).toUpperCase() + layout.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-2 mt-2">
          {availableLayouts.map((layout) => (
            <Button
              key={layout}
              size="sm"
              variant="outline"
              className={`text-xs py-1 px-2 h-auto ${
                currentLayout === layout
                  ? "bg-[#0ec1eb]/20 border-[#0ec1eb]"
                  : "bg-[#121a2b] border-[#0ec1eb]/30"
              }`}
              onClick={() => onLayoutChange(layout)}
            >
              {layout.charAt(0).toUpperCase() + layout.slice(1)}
            </Button>
          ))}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default LayoutController;
