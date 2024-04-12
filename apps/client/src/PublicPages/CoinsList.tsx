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
import Favorites from "@/components/favorites";

const CoinsList: React.FC = () => {
  const coins = useCryptoService();

  const getColorClass = (change: number) => {
    return change > 0 ? "text-green-400" : "text-red-400";
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
    <div className="max-w-7xl w-full mx-auto py-8 px-4 flex gap-6">
      <div className="overflow-hidden rounded-lg mb-8 w-3/4">
        <Table className="w-full table-fixed">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Coin</TableHead>
              <TableHead>Price (24h%)</TableHead>
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
                    // onClick={() => addToFavorites(coin)}
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

      <Favorites />
    </div>
  );
};

export default CoinsList;
