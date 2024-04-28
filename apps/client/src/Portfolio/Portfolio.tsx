import Favorites from "@/components/favorites";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/Sidebar";

const Portfolio: React.FC = () => {
  return (
    <div
      className="max-w-screen-2xl w-full mx-auto px-4  flex justify-between gap-4 "
      style={{ minHeight: "calc(100vh - 10rem)" }}
    >
      <Sidebar />

      <Outlet />

      <Favorites />
    </div>
  );
};

export default Portfolio;
