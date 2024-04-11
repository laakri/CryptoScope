import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCryptoService from "@/services/cryptoService";
import { FaRegStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { IoMdRemove } from "react-icons/io";
import {
  MdOutlineRemoveCircle,
  MdTrendingUp,
  MdTrendingDown,
} from "react-icons/md";

const Portfolio: React.FC = () => {
  const coins = useCryptoService();
  const [favorites, setFavorites] = useState<any[]>([]);

  const addToFavorites = (coin: any) => {
    setFavorites((prevFavorites) => [...prevFavorites, coin]);
  };

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
  const getChangePercentage = (change: number, currentPrice: number) => {
    const percentageChange = (change / currentPrice) * 100;
    return change > 0 ? (
      <div className="text-xs">(${percentageChange.toFixed(2)}%)</div>
    ) : (
      <div>(${percentageChange.toFixed(2)}%)</div>
    );
  };
  return (
    <div className="min-h-screen text-white">
      <main className="max-w-7xl mx-auto py-8 px-4 flex gap-6">
        <div className="overflow-hidden rounded-lg mb-8 w-3/4">
          <Table className="w-full table-fixed">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Coin</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Target 1</TableHead>
                <TableHead>Target 2</TableHead>
                <TableHead>Target 3</TableHead>
                <TableHead>Market Cap</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {coins.map((coin) => (
                <TableRow key={coin.id}>
                  <TableCell className="flex items-center gap-1">
                    <Button
                      className="hover:text-yellow-400 text-lg"
                      variant="link"
                      onClick={() => addToFavorites(coin)}
                    >
                      <FaRegStar />
                    </Button>
                    {coin.name}
                  </TableCell>
                  <TableCell className={getColorClass(coin.price_change_24h)}>
                    <div className="flex items-center gap-2">
                      {coin.current_price}{" "}
                      {getChangePercentage(
                        coin.price_change_24h,
                        coin.current_price
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{coin.current_price}</TableCell>
                  <TableCell>{coin.current_price}</TableCell>
                  <TableCell>{coin.current_price}</TableCell>
                  <TableCell>{coin.market_cap}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="rounded-lg border max-h-max w-1/4">
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <FaRegStar />
              Favorites Coins
            </h2>
            {favorites.map((coin) => (
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
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Portfolio;
