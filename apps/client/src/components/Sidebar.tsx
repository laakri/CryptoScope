import { FaBitcoin, FaRegStar, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ButtonSmooth } from "./ui/button-smooth";
import { useEffect, useState } from "react";
import { getTargetTablesByUserId } from "@/services/PortfolioService";
import { useUserStore } from "@/stores/user";
import { FaHandsAslInterpreting } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import resorLine from "../assets/Lines/resor-line.png";
import { Input } from "./ui/input";

const Sidebar: React.FC = () => {
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
      className="overflow-hidden min-w-[13rem] h-full border-r  mt-4 pt-4 min-h-screen"
      style={{ minHeight: "calc(100vh - 10rem)" }}
    >
      <Link
        to="/Portfolio/Started"
        className="text-gray flex items-center rounded-sm hover:bg-gray-700 p-2 hover:cursor-pointer gap-2"
      >
        <FaHandsAslInterpreting className="text-yellow-400" />
        <div className="flex items-center gap-1">
          <p className="text-gray text-md">Getting Started</p>
        </div>
      </Link>
      <Link
        to="/Portfolio/GeneralIdea"
        className="text-gray flex items-center rounded-sm hover:bg-gray-700 p-2 hover:cursor-pointer gap-2"
      >
        <FaBitcoin className="text-blue-400" />
        <div className="flex items-center gap-1">
          <p className="text-gray text-md">General ideas</p>
        </div>
      </Link>
      <div className="my-4 px-2">
        <Input type="text" placeholder="Search lists..." />
      </div>
      <Link
        to="/Portfolio/list/6627905170dbf354df70874b"
        className="text-gray flex justify-between items-center rounded-sm hover:bg-gray-700 px-2 py-1 mb-1 hover:cursor-pointer"
      >
        <div className="flex items-center gap-2">
          <p className="text-gray text-md">Favorite Lists</p>
          <p className="text-gray text-xs">
            <FaRegStar />
          </p>
        </div>
      </Link>
      {/* <Link to="list/6626dbe550aa0db3b0c07130">
        <div className="min-h-6 px-1 flex flex-col gap-1 mb-4">
          <div className="flex items-center gap-1">
            <MdKeyboardArrowRight />
            <p className="text-gray hover:text-gray-100 hover:cursor-pointer ">
              Solana Coins
            </p>
          </div>
        </div>
      </Link> */}
      <div className="ml-2">
        <img src={resorLine} alt="resorLine" className="h-10" />
      </div>
      <div className="text-gray flex justify-between items-center rounded-sm hover:bg-gray-700 px-2 py-1 hover:cursor-pointer">
        <Link to="/Portfolio/list" className="flex items-center gap-1">
          <p className="text-gray text-md">Lists</p>
          <p className="text-gray text-xs">browse </p>
        </Link>
        <Link to="/Portfolio/list/6627905170dbf354df70874b">
          <ButtonSmooth className="text-[11px]">
            <FaPlus />
          </ButtonSmooth>
        </Link>
      </div>

      <div className="px-1 flex flex-col gap-1">
        {targetTables.length > 0 ? (
          targetTables.map((table) => (
            <Link to={`ListPage/${table._id}`} key={table._id}>
              <div className="flex items-center gap-1">
                <MdKeyboardArrowRight />
                <p className="text-gray hover:text-gray-100 hover:cursor-pointer">
                  {table.name}
                </p>
              </div>
            </Link>
          ))
        ) : (
          <div className="ml-2">
            <img src={resorLine} alt="resorLine" className="h-10" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
