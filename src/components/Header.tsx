
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-gray-900 mr-6">Supply Chain Visualization</h1>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#" className="text-blue-600 border-b-2 border-blue-600 pb-3 pt-3">Dashboard</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 pb-3 pt-3">Analytics</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 pb-3 pt-3">Inventory</a>
          <a href="#" className="text-gray-600 hover:text-gray-900 pb-3 pt-3">Shipments</a>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search facilities..." 
            className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500" 
          />
          <Search className="h-4 w-4 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center text-xs font-medium text-gray-600">
          US
        </div>
      </div>
    </header>
  );
};

export default Header;
