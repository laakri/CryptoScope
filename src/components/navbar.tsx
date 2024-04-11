import { TfiTarget } from "react-icons/tfi";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Login from "@/Auth/Login";
import SignUp from "@/Auth/SignUp";

function Navbar() {
  return (
    <div className="sticky top-0 left-0 w-full  z-10 bg-opacity-50 backdrop-filter backdrop-blur-lg px-2">
      <div className="py-3 px-1  border-b border-b-slate-900  ">
        <div className="max-w-7xl mx-auto flex justify-between ">
          <Link to="/" className="text-gray-300">
            <Button variant="link" className="flex items-center gap-2 font-4 ">
              <TfiTarget className="text-xl text-gray-200" />
              <p className="font-bold  text-lg ">CRYPTO SCOPE</p>
            </Button>
          </Link>

          <div className="flex items-center gap-4 ">
            <div>
              <Link to="/Portfolio" className="text-gray-300">
                <Button variant="ghost" className=" text-gray-300">
                  Portfolio
                </Button>
              </Link>
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
            <div className="flex gap-1">
              <Dialog>
                <DialogTrigger>
                  <Button variant="ghost">login</Button>
                </DialogTrigger>
                <Login />
              </Dialog>
              <Dialog>
                <DialogTrigger>
                  <Button variant="secondary">Sign Up</Button>
                </DialogTrigger>
                <SignUp />
              </Dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
