import { useState } from "react";
import { FaRegStar } from "react-icons/fa";
import {
  MdOutlineRemoveCircle,
  MdTrendingDown,
  MdTrendingUp,
} from "react-icons/md";
import { Button } from "./ui/button";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);

  const removeFromFavorites = (coinId: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((coin) => coin.id !== coinId)
    );
  };

  const getColorClass = (change: number) => {
    return change > 0 ? "text-green-400" : "text-red-400";
  };

  const getChangeIcon = (change: number) => {
    return change > 0 ? (
      <MdTrendingUp className="text-green-400" />
    ) : (
      <MdTrendingDown className="text-red-400" />
    );
  };

  return (
    <div className=" min-w-[20rem] mt-4">
      <div className="rounded-lg border min-h-72 max-h-max  ">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 justify-center">
            <FaRegStar />
            Favorites Coins
          </h2>
          {favorites.length === 0 ? (
            <p className="text-gray-400 text-center mt-12">
              No favorite coins added yet.
            </p>
          ) : (
            favorites.map((coin) => (
              <div
                key={coin.id}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center gap-1">
                  <p className="text-white font-medium ">{coin.name}</p>
                  <p className={getColorClass(coin.price_change_24h)}>
                    <p className="font-medium flex items-center gap-2 text-left">
                      {coin.current_price}
                      {getChangeIcon(coin.price_change_24h)}
                    </p>
                  </p>
                </div>
                <Button
                  variant="link"
                  onClick={() => removeFromFavorites(coin.id)}
                  className="hover:text-red-400 text-xl"
                >
                  <MdOutlineRemoveCircle />
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default Favorites;
