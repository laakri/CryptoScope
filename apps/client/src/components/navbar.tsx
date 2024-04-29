import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import { Dialog, DialogTrigger } from "@radix-ui/react-dialog";
import Login from "@/Auth/Login";
import SignUp from "@/Auth/SignUp";
import { useUserStore } from "@/stores/user";
import { MdLogout } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import whitelogo from "../assets/Lines/X-line.png";
import { Input } from "./ui/input";
import { getTopTrendingCoins } from "@/services/cryptoService";
import { FaBell } from "react-icons/fa";
import { ModeToggle } from "./mode-toggle";

function Navbar() {
  const { user, logout } = useUserStore();
  const logosRef = useRef<HTMLUListElement>(null);
  const [topTrendingCoins, setTopTrendingCoins] = useState<any[]>([]);

  useEffect(() => {
    const fetchTopTrendingCoins = async () => {
      let cachedData = localStorage.getItem("topTrendingCoins");
      let cachedTime = localStorage.getItem("topTrendingCoinsTime");
      if (cachedData && cachedTime) {
        const parsedData = JSON.parse(cachedData);
        const currentTime = new Date().getTime();
        const timeDiff = (currentTime - parseInt(cachedTime)) / (1000 * 60); // Difference in minutes
        if (timeDiff <= 20) {
          setTopTrendingCoins(parsedData);
          return;
        }
      }
      const trendingCoins = await getTopTrendingCoins();
      setTopTrendingCoins(trendingCoins);

      localStorage.setItem("topTrendingCoins", JSON.stringify(trendingCoins));
      localStorage.setItem(
        "topTrendingCoinsTime",
        new Date().getTime().toString()
      );
    };

    fetchTopTrendingCoins();
  }, []);
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
    <div className="sticky top-0 left-0 w-full z-50 bg-opacity-50 backdrop-filter backdrop-blur-lg px-2 border-b">
      <div className="py-3 px-1 border-b">
        <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/" className="">
            <Button variant="link" className="flex items-center gap-2 font-4 ">
              {/* <TfiTarget className="text-xl text-gray-200" /> */}
              <img src={whitelogo} alt="white-logo" className="w-6" />
              <p className="font-bold  text-lg ">CRYPTO SCOPE</p>
            </Button>
          </Link>
          <div className=" relative w-96">
            <Input
              type="text"
              placeholder="Search For User | Something else"
              className="h-7.5 "
            />
            <p className="text-sm text-muted-foreground absolute top-1 right-1.5">
              <kbd className="pointer-events-none inline-flex ml-2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>S
              </kbd>
            </p>
          </div>
          <div className="flex items-center gap-4 ">
            <div className="flex items-center gap-1">
              <Link to="/CoinsList" className="">
                <Button variant="ghost" className=" ">
                  Coins
                </Button>
              </Link>
              {user && (
                <Link to="/Portfolio" className="">
                  <Button variant="ghost" className=" ">
                    Portfolio
                  </Button>
                </Link>
              )}
              <Link to="/Documentation" className="">
                <Button variant="ghost" className=" ">
                  Documentation
                </Button>
              </Link>
            </div>
            <div className="flex items-center  gap-1 ">
              <ModeToggle />
              {!user ? (
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
                  <Button variant="outline" size={"icon"} className="  ">
                    <FaBell />
                  </Button>
                  <Button variant="link">
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
      </div>
      {topTrendingCoins.length !== 0 && (
        <div className="w-full h-10  bg-opacity-50 backdrop-filter backdrop-blur-lg inline-flex flex-nowrap overflow-hidden mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)">
          <ul
            ref={logosRef}
            className="flex items-center justify-center md:justify-start &_li:mx-8 &_img:max-w-none animate-infinite-scroll"
          >
            {topTrendingCoins.map((coin, index) => (
              <li
                key={`${coin._id}-${index}`}
                className="flex mx-6 gap-2 items-center  "
              >
                <img
                  src={coin.image}
                  alt={coin.symbol}
                  className="h-6 w-6  rounded-xl bg-white"
                />
                <div>{coin.symbol.toUpperCase()}</div>
                <div>{coin.current_price.toFixed(2)}</div>
                <div className=" text-green-400">
                  {coin.price_change_24h.toFixed(2)}%
                </div>
              </li>
            ))}
            {topTrendingCoins.map((coin, index) => (
              <li
                key={`${coin._id}-${index}`}
                className="flex mx-6 gap-2 items-center  "
              >
                <img
                  src={coin.image}
                  alt={coin.symbol}
                  className="h-6 w-6  rounded-xl bg-white"
                />
                <div>{coin.symbol.toUpperCase()}</div>
                <div>{coin.current_price.toFixed(2)}</div>
                <div className=" text-green-400">
                  {coin.price_change_24h.toFixed(2)}%
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
export default Navbar;
