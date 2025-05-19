
import { Link, useLocation } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const Header = () => {
  const location = useLocation();
  
  return (
    <header className="bg-[#0b1420] border-b border-[#0ec1eb]/30 py-4 px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-[#0ec1eb] text-xl font-semibold mr-8">
            Supply Chain Visualizer
          </h1>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link 
                  to="/" 
                  className={`${navigationMenuTriggerStyle()} ${location.pathname === '/' ? 'bg-[#0b1420] text-[#00ffcc]' : ''}`}
                >
                  Map View
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link 
                  to="/bloom" 
                  className={`${navigationMenuTriggerStyle()} ${location.pathname === '/bloom' ? 'bg-[#0b1420] text-[#00ffcc]' : ''}`}
                >
                  Bloom
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
