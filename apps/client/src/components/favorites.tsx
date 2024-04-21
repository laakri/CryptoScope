import { useState, useEffect } from "react";
import {
  MdOutlineRemoveCircle,
  MdTrendingDown,
  MdTrendingUp,
} from "react-icons/md";
import { Button } from "./ui/button";
import arrowimg from "../assets/Lines/squi-arrow.png";
import docnotfounimg from "../assets/Lines/image-removebg-preview (2).png";
import { Card } from "./ui/card";
import { Reorder } from "framer-motion";
import {
  DeleteFromFavorites,
  getUserFavoriteCoins,
} from "@/services/cryptoService";
import { useQuery } from "react-query";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<any[]>([]);
  const { data: FavData, isLoading: FavLoading } = useQuery(
    "GetFavoriteCoins",
    getUserFavoriteCoins
  );

  useEffect(() => {
    if (FavData) {
      setFavorites(FavData);
    }
  }, [FavData]);

  const removeFromFavorites = async (coinId: string) => {
    try {
      await DeleteFromFavorites(coinId);
      setFavorites((prevFavorites) =>
        prevFavorites.filter((coin) => coin._id !== coinId)
      );
    } catch (error) {
      console.error("Error removing coin from favorites:", error);
    }
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

  const handleReorder = (newOrder: any[]) => {
    setFavorites(newOrder);
  };

  return (
    <div className="min-w-[20rem] mt-4">
      <div className="rounded-lg border min-h-72 max-h-max">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2 justify-center">
            <img src={arrowimg} alt="" className="h-7" />
            Favorites Coins
          </h2>
          {FavLoading ? (
            "Loading..."
          ) : FavData.length === 0 ? (
            <div className="text-gray-400 text-center mt-12 flex flex-col items-center gap-2">
              <img
                src={docnotfounimg}
                alt="docnotfounimg"
                className="h-14 w-14"
              />
              No favorite coins added yet.
            </div>
          ) : (
            <Reorder.Group values={favorites} onReorder={handleReorder}>
              {favorites.map((coin: any, index) => (
                <Reorder.Item key={coin.id} value={coin.id}>
                  <Card className="flex rounded-sm items-center justify-between mb-2 pl-2">
                    <div className="flex items-center gap-1">
                      <p className="text-white font-medium">
                        {index}
                        {coin.coinId.name}
                      </p>
                      <p
                        className={getColorClass(coin.coinId.price_change_24h)}
                      >
                        <span className="font-medium flex items-center gap-2 text-left">
                          {coin.coinId.current_price}
                          {getChangeIcon(coin.coinId.price_change_24h)}
                        </span>
                      </p>
                    </div>
                    <Button
                      variant="link"
                      size={"icon"}
                      onClick={() => removeFromFavorites(coin._id)}
                      className="hover:text-red-400 text-xl"
                    >
                      <MdOutlineRemoveCircle />
                    </Button>
                  </Card>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
