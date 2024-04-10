import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { TfiTarget } from "react-icons/tfi";

function Navbar() {
  return (
    <div className="py-2 px-1  border-b border-b-slate-900 ">
      <div className="max-w-7xl mx-auto flex items-center gap-4 ">
        <div className="flex items-center gap-2 font-4 ">
          <TfiTarget className="text-lg text-red-500" />

          <p className="font-bold  text-lg">Crypto Scope</p>
        </div>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Portfolio</NavigationMenuTrigger>
              <NavigationMenuContent>
                <NavigationMenuLink>stuff</NavigationMenuLink>
                <NavigationMenuLink>stuff</NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <NavigationMenuLink>Documentation</NavigationMenuLink>
              </NavigationMenuTrigger>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
}
export default Navbar;
