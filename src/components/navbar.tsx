import { TfiTarget } from "react-icons/tfi";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Login from "@/Auth/Login";
import SignUp from "@/Auth/SignUp";
import { useUserStore } from "@/stores/user";
import { MdLogout } from "react-icons/md";
import { useEffect, useRef } from "react";
import whitelogo from "../assets/Lines/X-line.png";

function Navbar() {
  const { user, logout } = useUserStore();
  const isLoggedIn = localStorage.getItem("token") !== null;
  const logosRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (logosRef.current) {
      let ul = logosRef.current;
      ul.insertAdjacentHTML("afterend", ul.outerHTML);
      if (ul.nextSibling instanceof HTMLElement) {
        ul.nextSibling.setAttribute("aria-hidden", "true");
      }
    }
  }, []);
  const handleLogout = () => {
    logout();
  };
  return (
    <div className="sticky top-0 left-0 w-full z-10 bg-opacity-50 backdrop-filter backdrop-blur-lg px-2 border-b">
      <div className="py-3 px-1 border-b">
        <div className="max-w-7xl mx-auto flex justify-between ">
          <Link to="/" className="text-gray-300">
            <Button variant="link" className="flex items-center gap-2 font-4 ">
              {/* <TfiTarget className="text-xl text-gray-200" /> */}
              <img src={whitelogo} alt="white-logo" className="w-6" />
              <p className="font-bold  text-lg ">CRYPTO SCOPE</p>
            </Button>
          </Link>

          <div className="flex items-center gap-4 ">
            <div>
              <Link to="/CoinsList" className="text-gray-300">
                <Button variant="ghost" className=" text-gray-300">
                  Coins
                </Button>
              </Link>
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
            </div>
            {!isLoggedIn ? (
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
            ) : (
              <div className="flex gap-1">
                <Button variant="secondary">
                  <p>{user ? user.userName : "User Name"}</p>
                </Button>

                <Button
                  variant="ghost"
                  className="text-red-400 hover:text-red-400"
                  onClick={handleLogout}
                >
                  <MdLogout />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full h-10  bg-opacity-50 backdrop-filter backdrop-blur-lg inline-flex flex-nowrap overflow-hidden mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)">
        <ul
          ref={logosRef}
          className="flex items-center justify-center md:justify-start &_li:mx-8 &_img:max-w-none animate-infinite-scroll gap-6"
        >
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
          <li>
            <p>BTCBTCBTC</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Navbar;
