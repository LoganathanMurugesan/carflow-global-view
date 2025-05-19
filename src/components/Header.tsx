
import { Link } from 'react-router-dom';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const Header = () => {
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
                <Link to="/" className={navigationMenuTriggerStyle()}>
                  Map View
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link to="/bloom" className={navigationMenuTriggerStyle()}>
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
