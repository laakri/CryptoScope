import Favorites from "@/components/favorites";
import { Button } from "@/components/ui/button";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

const Portfolio: React.FC = () => {
  return (
    <div
      className="max-w-7xl w-full mx-auto px-4  flex justify-between gap-4 min-h-screen"
      style={{ minHeight: "calc(100vh - 6rem)" }}
    >
      <div className="w-full flex gap-4">
        <div className="overflow-hidden rounded-lg  min-w-[13rem] h-full mt-4">
          <div className="text-gray-300 flex justify-between items-center rounded-sm hover:bg-gray-900 p-2 hover:cursor-pointer">
            <div className="flex items-center gap-1 ">
              <p className="text-gray-200 text-sm ">Lists</p>
              <p className="text-gray-400 text-xs ">Brows all</p>
            </div>
            <button className="bg-gray-800 hover:bg-gray-600 rounded-md  p-1">
              <IoMdAdd className="text-md " />
            </button>
          </div>
          <div className="mt-2 min-h-24 px-1 flex flex-col gap-1">
            <div className="flex items-center gap-1">
              <MdKeyboardArrowRight />
              <p>Solana Coins</p>
            </div>
            <div className="flex items-center gap-1">
              <MdKeyboardArrowRight />
              <p>Solana Coins</p>
            </div>
            <div className="flex items-center gap-1">
              <MdKeyboardArrowRight />
              <p>Solana Coins</p>
            </div>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg  w-full border-2 mt-4 border-gray-900 p-4">
          Lists
        </div>
      </div>
      <Favorites />
    </div>
  );
};

export default Portfolio;
