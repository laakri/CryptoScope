import Favorites from "@/components/favorites";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaBitcoin, FaHandsAslInterpreting } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaRegStar } from "react-icons/fa";
import StartingSection from "./StartingPage";

const Portfolio: React.FC = () => {
  return (
    <div
      className="max-w-7xl w-full mx-auto px-4  flex justify-between gap-4 min-h-screen"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="w-full flex gap-4">
        <div className="overflow-hidden min-w-[13rem] h-full border-r  mt-4 pt-4">
          <div className="text-gray-300 flex items-center rounded-sm hover:bg-gray-900 p-2 hover:cursor-pointer gap-2">
            <FaHandsAslInterpreting className="text-yellow-400" />
            <div className="flex items-center gap-1">
              <p className="text-gray-200 text-md">Getting Started</p>
            </div>
          </div>
          <div className="text-gray-300 flex items-center rounded-sm hover:bg-gray-900 p-2 hover:cursor-pointer gap-2">
            <FaBitcoin className="text-blue-400" />
            <div className="flex items-center gap-1">
              <p className="text-gray-200 text-md">General idea</p>
            </div>
          </div>
          <div className="my-4 px-2">
            <input
              type="text"
              placeholder="Search lists..."
              className="bg-gray-800 text-gray-300 rounded-md py-1 px-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="text-gray-300 flex justify-between items-center rounded-sm hover:bg-gray-900 p-2 hover:cursor-pointer">
            <div className="flex items-center gap-1">
              <p className="text-gray-200 text-md">Lists</p>
              <p className="text-gray-400 text-xs">Browse all</p>
            </div>
            <button className="bg-gray-800 hover:bg-gray-600 rounded-md p-1">
              <IoMdAdd className="text-md" />
            </button>
          </div>

          <div className="min-h-24 px-1 flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <MdKeyboardArrowRight />
              <p className="text-gray-300">Solana Coins</p>
            </div>
            <div className="flex items-center gap-1">
              <MdKeyboardArrowRight />
              <p className="text-gray-300">Ethereum Coins</p>
            </div>
            <div className="flex items-center gap-1">
              <MdKeyboardArrowRight />
              <p className="text-gray-300">Favorite Coins</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden w-full  p-4">
          <div className="flex justify-between  ">
            <Button
              variant="secondary"
              className="rounded-2xl bg-gray-800 hover:bg-gray-600"
            >
              Share
            </Button>
            <div className="flex items-center gap-1 ">
              <Button variant="link" className=" text-md hover:text-yellow-500">
                <FaRegStar />
              </Button>
              <Button variant="ghost" className="flex gap-1">
                Add List
                <IoMdAdd className="text-md" />
              </Button>
            </div>
          </div>
          <StartingSection />
        </div>
      </div>
      <Favorites />
    </div>
  );
};

export default Portfolio;
