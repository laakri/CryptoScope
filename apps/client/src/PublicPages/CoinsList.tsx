import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCryptoService, addToFavorites } from "@/services/cryptoService";
import { FaRegStar, FaSearch } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Favorites from "@/components/favorites";
import { Input } from "@/components/ui/input";
import { useQueryClient } from "react-query";

const CoinsList: React.FC = () => {
  const client = useQueryClient();
  const coins = useCryptoService();

  const getColorClass = (change: number) => {
    return change > 0 ? "text-green-300" : "text-red-400";
  };

  const getChangePercentage = (change: number, currentPrice: number) => {
    const percentageChange = (change / currentPrice) * 100;
    return change > 0 ? (
      <div className="text-xs">{percentageChange.toFixed(2)}%</div>
    ) : (
      <div>{percentageChange.toFixed(2)}%</div>
    );
  };
  const addToFavoritess = async (coinId: string) => {
    await addToFavorites(coinId);
    client.invalidateQueries("GetFavoriteCoins");
  };

  return (
    <div
      className="max-w-7xl w-full mx-auto px-4  flex justify-between gap-4 min-h-screen"
      style={{ minHeight: "calc(100vh - 10rem)" }}
    >
      <div className="overflow-hidden rounded-lg my-8  w-3/4">
        <div className="flex flex-col justify-center items-center  mt-6 mb-8 ">
          <h1 className="text-4xl">Search for Coin</h1>
          <div className=" relative w-96 mt-6">
            <Input
              type="text"
              placeholder="Search For Coin by name"
              className="h-10 rounded-2xl "
            />
            <p className="text-sm text-muted-foreground absolute top-2 right-2">
              <Button className="h-6 rounded-lg border bg-muted hover:bg-slate-700  px-2 text-[10px]  text-muted-foreground ">
                <FaSearch />
              </Button>
            </p>
          </div>
        </div>
        <Table className="w-full table-fixed">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Coin</TableHead>
              <TableHead>Price (24h%)</TableHead>
              <TableHead>price change (24h)</TableHead>
              <TableHead>Total Supply</TableHead>
              <TableHead>Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coins.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell>
                  <Button
                    className="hover:text-yellow-400 text-lg"
                    variant="link"
                    size={"icon"}
                    onClick={() => addToFavoritess(coin._id)}
                  >
                    <FaRegStar />
                  </Button>
                </TableCell>
                <TableCell className="flex items-center gap-1 mt-1.5 ">
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="w-6 h-6 mr-2 "
                  />
                  {coin.name}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {coin.current_price}
                    <div className={getColorClass(coin.price_change_24h)}>
                      {getChangePercentage(
                        coin.price_change_24h,
                        coin.current_price
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className={getColorClass(coin.price_change_24h)}>
                  {coin.price_change_24h.toFixed(2)}
                </TableCell>
                <TableCell>{coin.total_supply}</TableCell>
                <TableCell>{coin.market_cap}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Favorites />
    </div>
  );
};
export default CoinsList;
