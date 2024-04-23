import Favorites from "@/components/favorites";
import { MdKeyboardArrowRight } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { FaBitcoin, FaHandsAslInterpreting } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { FaPlus, FaRegStar } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { ButtonSmooth } from "@/components/ui/button-smooth";
import { getTargetTablesByUserId } from "@/services/PortfolioService";
import { useEffect, useState } from "react";
import { useUserStore } from "@/stores/user";

const Portfolio: React.FC = () => {
  const [targetTables, setTargetTables] = useState<any[]>([]);
  const { user } = useUserStore();

  useEffect(() => {
    const fetchTargetTables = async () => {
      try {
        if (user) {
          const data = await getTargetTablesByUserId(user?.userId);
          setTargetTables(data);
        }
      } catch (error) {
        console.error("Error fetching target tables:", error);
      }
    };

    fetchTargetTables();
  }, []);
  return (
    <div
      className="max-w-7xl w-full mx-auto px-4  flex justify-between gap-4 min-h-screen"
      style={{ minHeight: "calc(100vh - 10rem)" }}
    >
      <div className="w-full flex gap-4">
        <div className="overflow-hidden min-w-[13rem] h-full border-r  mt-4 pt-4">
          <Link
            to="/Portfolio/Started"
            className="text-gray-300 flex items-center rounded-sm hover:bg-gray-900 p-2 hover:cursor-pointer gap-2"
          >
            <FaHandsAslInterpreting className="text-yellow-400" />
            <div className="flex items-center gap-1">
              <p className="text-gray-200 text-md">Getting Started</p>
            </div>
          </Link>
          <Link
            to="/Portfolio/GeneralIdea"
            className="text-gray-300 flex items-center rounded-sm hover:bg-gray-900 p-2 hover:cursor-pointer gap-2"
          >
            <FaBitcoin className="text-blue-400" />
            <div className="flex items-center gap-1">
              <p className="text-gray-200 text-md">General ideas</p>
            </div>
          </Link>
          <div className="my-4 px-2">
            <input
              type="text"
              placeholder="Search lists..."
              className="bg-gray-800 text-gray-300 rounded-md py-1 px-2 w-full focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <Link
            to="/Portfolio/list"
            className="text-gray-300 flex justify-between items-center rounded-sm hover:bg-gray-900 px-2 py-1 mb-1 hover:cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <p className="text-gray-200 text-md">Favorite Lists</p>
              <p className="text-gray-400 text-xs">
                <FaRegStar />
              </p>
            </div>
          </Link>
          <Link to="ListPage">
            <div className="min-h-6 px-1 flex flex-col gap-1 mb-4">
              <div className="flex items-center gap-1">
                <MdKeyboardArrowRight />
                <p className="text-gray-400 hover:text-gray-100 hover:cursor-pointer ">
                  Solana Coins
                </p>
              </div>
            </div>
          </Link>
          <Link
            to="/Portfolio/list"
            className="text-gray-300 flex justify-between items-center rounded-sm hover:bg-gray-900 px-2 py-1 hover:cursor-pointer"
          >
            <div className="flex items-center gap-1">
              <p className="text-gray-200 text-md">Lists</p>
              <p className="text-gray-400 text-xs">Browse all</p>
            </div>
            <Link to="/Portfolio/list/66">
              <ButtonSmooth className="text-[11px]">
                <FaPlus />
              </ButtonSmooth>
            </Link>
          </Link>

          <div className="px-1 flex flex-col gap-1">
            {targetTables ? (
              targetTables.map((table) => (
                <Link to={`list/${table._id}`} key={table._id}>
                  <div className="flex items-center gap-1">
                    <MdKeyboardArrowRight />
                    <p className="text-gray-400 hover:text-gray-100 hover:cursor-pointer">
                      {table.name}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div>now data </div>
            )}
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
              <Link to="/Portfolio/list/66">
                <Button variant="ghost" className="flex gap-1">
                  Add List
                  <IoMdAdd className="text-md" />
                </Button>
              </Link>
            </div>
          </div>
          <Outlet />
        </div>
      </div>
      <Favorites />
    </div>
  );
};

export default Portfolio;
