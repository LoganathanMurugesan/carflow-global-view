
import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface GraphSearchProps {
  onSearch: (query: string) => void;
}

const GraphSearch = ({ onSearch }: GraphSearchProps) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
  };

  const handleClear = () => {
    setSearchInput('');
    onSearch('');
  };

  return (
    <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
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
  );
};

export default GraphSearch;
