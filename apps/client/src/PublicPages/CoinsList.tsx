import { useEffect, useState } from "react";
import { QueryFunction, useQuery, useQueryClient } from "react-query";
import { FaRegStar, FaSearch, FaStar } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
  useCryptoService,
  addToFavorites,
  getUserFavoriteCoins,
  DeleteFromFavorites,
} from "@/services/cryptoService";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Favorites from "@/components/favorites";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/stores/user";
import { useToast } from "@/components/ui/use-toast";

const CoinsList: React.FC = () => {
  const { toast } = useToast();
  const { user } = useUserStore();
  const client = useQueryClient();
  const [page, setPage] = useState<number>(0);
  const [search, setSearch] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCoins, setTotalCoins] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [favoriteCoins, setFavoriteCoins] = useState<string[]>([]);
  const [addCoinFavLoading, setAddCoinFavLoading] = useState(false);
  const coins = useCryptoService(page, search);

  const fetchUserFavoriteCoins: QueryFunction<any, string> = async () => {
    try {
      if (user) {
        const userId = user.userId;
        const response = await getUserFavoriteCoins(userId);
        return response;
      }
    } catch (error) {
      console.error("Error getting user's favorite coins:", error);
      throw new Error("Failed to fetch user's favorite coins");
    }
  };
  const { data: FavData } = useQuery(
    "GetFavoriteCoins",
    fetchUserFavoriteCoins
  );

  useEffect(() => {
    if (user && FavData) {
      const coinIds = FavData.map((favCoin: any) => favCoin.coinId._id);
      setFavoriteCoins(coinIds);
    }
  }, [user, FavData]);
  useEffect(() => {
    setTotalPages(coins.totalPages);
    setTotalCoins(coins.totalCoins);
    setLoading(false);
  }, [coins, user, FavData]);

  const handlePreviousPage = () => {
    setPage((prevPage: number) => Math.max(prevPage - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prevPage: number) => Math.min(prevPage + 1, totalPages - 1));
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = event.target.value;
    setSearch(searchTerm);
    setPage(0);
  };

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
  const removeFromFavoritesHandler = async (coinId: string) => {
    try {
      await DeleteFromFavorites(coinId);
      setFavoriteCoins((prevFavoriteCoins) => [...prevFavoriteCoins, coinId]);
      client.invalidateQueries("GetFavoriteCoins");
    } catch (error) {
      console.error("Error removing coin from favorites:", error);
    }
  };
  const addToFavoritesHandler = async (coinId: string) => {
    setAddCoinFavLoading(true);

    if (!user) {
      toast({
        variant: "destructive",
        description: "You must be logged in to add favorites.",
      });
      setAddCoinFavLoading(false);

      return;
    }

    try {
      await addToFavorites(coinId, user.userId);
      toast({
        description: "Coin added to favorites!",
      });
      setFavoriteCoins((prevFavoriteCoins) => [...prevFavoriteCoins, coinId]);
      client.invalidateQueries("GetFavoriteCoins");
    } catch (error) {
      console.error("Error adding coin to favorites:", error);
    }
    setAddCoinFavLoading(false);
  };

  const isFavorite = (coinId: string) => {
    return favoriteCoins.includes(coinId);
  };

  return (
    <div
      className="max-w-screen-2xl w-full mx-auto px-4 flex justify-between gap-4 min-h-screen"
      style={{ minHeight: "calc(100vh - 10rem)" }}
    >
      <div className="overflow-hidden rounded-lg my-8 w-3/4">
        <div className="flex flex-col justify-center items-center mt-6 mb-8">
          <h1 className="text-4xl">Search for Coin</h1>
          <div className="relative w-96 mt-6">
            <Input
              type="text"
              placeholder="Search For Coin by name"
              className="h-10 rounded-2xl"
              onChange={handleSearch}
            />
            <p className="text-sm text-muted-foreground absolute top-2 right-2">
              <Button className="h-6 rounded-lg border bg-muted hover:bg-slate-700 px-2 text-[10px] text-muted-foreground">
                <FaSearch />
              </Button>
            </p>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center h-36">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-gray-50"></div>
          </div>
        ) : (
          <>
            <Table className="w-full table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Coin</TableHead>
                  <TableHead>Price (24h%)</TableHead>
                  <TableHead>Price Change (24h)</TableHead>
                  <TableHead>Total Supply</TableHead>
                  <TableHead>Market Cap</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coins.coins.map((coin: any) => (
                  <TableRow key={coin.id}>
                    <TableCell>
                      {addCoinFavLoading ? (
                        <Button
                          className="spin text-md"
                          variant="link"
                          size={"icon"}
                        >
                          <AiOutlineLoading3Quarters className="animate-spin " />
                        </Button>
                      ) : isFavorite(coin._id) ? (
                        <Button
                          className="text-yellow-400 text-lg"
                          variant="link"
                          size={"icon"}
                          onClick={() => removeFromFavoritesHandler(coin._id)}
                        >
                          <FaStar />
                        </Button>
                      ) : (
                        <Button
                          className="hover:text-yellow-400 text-lg"
                          variant="link"
                          size={"icon"}
                          onClick={() => addToFavoritesHandler(coin._id)}
                        >
                          <FaRegStar />
                        </Button>
                      )}
                    </TableCell>
                    <TableCell className="flex items-center gap-1 mt-1.5 ">
                      <img
                        src={coin.image}
                        alt={coin.name}
                        className="w-6 h-6 mr-2"
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

            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={handlePreviousPage} />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => {
                  const startPage = Math.max(0, page - 2);
                  const endPage = Math.min(startPage + 4, totalPages - 1);

                  if (index >= startPage && index <= endPage) {
                    return (
                      <PaginationItem key={index}>
                        <PaginationLink
                          href="#"
                          onClick={() => setPage(index)}
                          isActive={page === index}
                        >
                          {index + 1}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  }
                  return null;
                })}
                <PaginationItem>
                  <PaginationNext href="#" onClick={handleNextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
      <Favorites />
    </div>
  );
};

export default CoinsList;
