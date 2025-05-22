
import { useState } from 'react';
import { Search, X, Filter, ChevronDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FacilityType } from '@/types/supply-chain';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';

interface GraphSearchProps {
  onSearch: (query: string) => void;
  onFilterChange?: (filters: GraphFilters) => void;
}

interface GraphFilters {
  types: FacilityType[];
  connectionStatus?: string[];
}

const GraphSearch = ({ onSearch, onFilterChange }: GraphSearchProps) => {
  const [searchInput, setSearchInput] = useState('');
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<GraphFilters>({
    types: Object.values(FacilityType),
    connectionStatus: ['in-transit', 'completed', 'scheduled']
  });

  const facilityTypes = [
    { value: FacilityType.MANUFACTURING, label: 'Manufacturing' },
    { value: FacilityType.DISTRIBUTION, label: 'Distribution' },
    { value: FacilityType.SHOWROOM, label: 'Showroom' },
    { value: FacilityType.SUPPLIER, label: 'Supplier' },
    { value: FacilityType.BUYER, label: 'Buyer' },
  ];

  const statusTypes = [
    { value: 'in-transit', label: 'In Transit' },
    { value: 'completed', label: 'Completed' },
    { value: 'scheduled', label: 'Scheduled' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch('');
  };

  const handleTypeFilterChange = (type: FacilityType) => {
    const newTypes = selectedFilters.types.includes(type)
      ? selectedFilters.types.filter(t => t !== type)
      : [...selectedFilters.types, type];
    
    const updatedFilters = { ...selectedFilters, types: newTypes };
    setSelectedFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleStatusFilterChange = (status: string) => {
    const newStatus = selectedFilters.connectionStatus?.includes(status)
      ? selectedFilters.connectionStatus.filter(s => s !== status)
      : [...(selectedFilters.connectionStatus || []), status];
    
    const updatedFilters = { ...selectedFilters, connectionStatus: newStatus };
    setSelectedFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const handleCommandSelection = (command: string) => {
    switch (command) {
      case 'find-isolated':
        console.log('Finding isolated nodes');
        break;
      case 'expand-all':
        console.log('Expanding all nodes');
        break;
      case 'collapse-all':
        console.log('Collapsing all nodes');
        break;
      case 'highlight-path':
        console.log('Ready to highlight path between two nodes');
        break;
    }
    setIsCommandOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 flex-1 max-w-md">
      <form onSubmit={handleSearch} className="relative flex">
        <Search 
          size={18} 
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#0ec1eb]/60" 
        />
        <Input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search nodes by name, type..."
          className="pl-10 pr-10 h-9 bg-[#121a2b] border-[#0ec1eb]/30 text-white placeholder:text-[#0ec1eb]/60 rounded-md focus:border-[#00ffcc]/50 transition-colors"
          onKeyDown={(e) => {
            if (e.key === '/') {
              e.preventDefault();
              setIsCommandOpen(true);
            }
          }}
        />
        {searchInput && (
          <button 
            type="button" 
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#0ec1eb]/60 hover:text-[#0ec1eb]"
          >
            <X size={16} />
          </button>
        )}
      </form>

      <Collapsible 
        open={isAdvancedOpen} 
        onOpenChange={setIsAdvancedOpen}
        className="bg-[#0b1420]/90 border border-[#0ec1eb]/30 rounded-md"
      >
        <div className="flex gap-2 items-center">
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-[#0ec1eb]/80 h-8 px-3"
            >
              <Filter size={14} className="mr-1" />
              <span className="text-xs">Filters</span>
              <ChevronDown size={14} className={`ml-auto transition-transform ${isAdvancedOpen ? 'transform rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-[#0ec1eb]/80 h-8 px-3"
            onClick={() => setIsCommandOpen(true)}
          >
            <span className="text-xs">/Commands</span>
          </Button>
        </div>
        
        <CollapsibleContent className="p-3 pt-1">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-xs text-[#0ec1eb] mb-2">Node Types</h4>
              <div className="space-y-1">
                {facilityTypes.map((type) => (
                  <div key={type.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`type-${type.value}`}
                      checked={selectedFilters.types.includes(type.value)}
                      onChange={() => handleTypeFilterChange(type.value)}
                      className="mr-2 accent-[#0ec1eb]"
                    />
                    <label 
                      htmlFor={`type-${type.value}`}
                      className="text-xs text-white"
                    >
                      {type.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-xs text-[#0ec1eb] mb-2">Connection Status</h4>
              <div className="space-y-1">
                {statusTypes.map((status) => (
                  <div key={status.value} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`status-${status.value}`}
                      checked={selectedFilters.connectionStatus?.includes(status.value) || false}
                      onChange={() => handleStatusFilterChange(status.value)}
                      className="mr-2 accent-[#0ec1eb]"
                    />
                    <label 
                      htmlFor={`status-${status.value}`}
                      className="text-xs text-white"
                    >
                      {status.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      
      {/* Command Dialog */}
      <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
        <Command className="bg-[#0b1420] border border-[#0ec1eb]/30">
          <CommandInput 
            placeholder="Type a command..." 
            className="bg-[#121a2b] border-[#0ec1eb]/30 text-white" 
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Graph Commands">
              <CommandItem 
                onSelect={() => handleCommandSelection('find-isolated')}
                className="text-[#0ec1eb] hover:bg-[#182338]"
              >
                <Search className="mr-2 h-4 w-4" />
                <span>Find isolated nodes</span>
              </CommandItem>
              <CommandItem 
                onSelect={() => handleCommandSelection('expand-all')}
                className="text-[#0ec1eb] hover:bg-[#182338]"
              >
                <Filter className="mr-2 h-4 w-4" />
                <span>Expand all nodes</span>
              </CommandItem>
              <CommandItem 
                onSelect={() => handleCommandSelection('collapse-all')}
                className="text-[#0ec1eb] hover:bg-[#182338]"
              >
                <Filter className="mr-2 h-4 w-4" />
                <span>Collapse all nodes</span>
              </CommandItem>
              <CommandItem 
                onSelect={() => handleCommandSelection('highlight-path')}
                className="text-[#0ec1eb] hover:bg-[#182338]"
              >
                <Filter className="mr-2 h-4 w-4" />
                <span>Highlight path between nodes</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
};

export default GraphSearch;
