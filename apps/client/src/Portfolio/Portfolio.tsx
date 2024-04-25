import Favorites from "@/components/favorites";
import { IoMdAdd } from "react-icons/io";
import { Button } from "@/components/ui/button";
import { FaRegStar } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Portfolio: React.FC = () => {
  return (
    <div
      className="max-w-7xl w-full mx-auto px-4  flex justify-between gap-4 "
      style={{ minHeight: "calc(100vh - 10rem)" }}
    >
      {/* Render the Sidebar component here */}
      <Sidebar />

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

      {/* Render the Favorites component here */}
      <Favorites />
    </div>
  );
};

export default Portfolio;
