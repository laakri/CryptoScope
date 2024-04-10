import { TfiTarget } from "react-icons/tfi";
import { Button } from "./ui/button";
function Navbar() {
  return (
    <div className="py-3 px-1  border-b border-b-slate-900  ">
      <div className="max-w-7xl mx-auto flex justify-between ">
        <div className="flex items-center gap-2 font-4 ">
          <TfiTarget className="text-lg text-gray-300" />
          <p className="font-bold  text-md ">Crypto Scope</p>
        </div>
        <div className="flex items-center gap-4 ">
          <div>
            <Button variant="ghost" className=" text-gray-300">
              Portfolio
            </Button>
            <Button variant="ghost" className=" text-gray-300">
              Documentation
            </Button>
            <Button variant="ghost" className=" text-gray-300">
              Informations
            </Button>
            <Button variant="ghost" className=" text-gray-300">
              Dashboard
            </Button>
          </div>
          <div className="flex gap-2 ">
            <Button variant="ghost">Connect Wallet</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
