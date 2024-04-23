import * as React from "react";
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { TiPlus } from "react-icons/ti";
import { getCoinSuggestions, searchCoins } from "@/services/PortfolioService";

const CoinSearchDialog: React.FC = () => {
  const [suggestions, setSuggestions] = React.useState<any>([]);
  const [trendings, setTrendings] = React.useState<any>([]);
  const [searchedData, setSearchedData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [searching, setSearching] = React.useState(false);

  React.useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const { topBigCoins, trendingCoins } = await getCoinSuggestions();
        setSuggestions([...topBigCoins]);
        setTrendings([...trendingCoins]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching coin suggestions:", error);
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

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

  const handleSearch = async (query: string) => {
    try {
      setSearching(query !== "");

      const results = await searchCoins(query);
      setSearchedData(results);
    } catch (error) {
      console.error("Error searching for coins:", error);
    }
  };

  const handleCoinClick = (id: string) => {
    console.log("Clicked item _id:", id);
  };

  return (
    <>
      <CommandInput
        placeholder="Type a coin or search..."
        onChange={(e: any) => handleSearch(e.target.value)}
      />
      {searching ? (
        <CommandList>
          {loading ? (
            <div>Loading...</div>
          ) : searchedData.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              <CommandGroup heading="Suggestions">
                {searchedData.map((coin: any) => (
                  <CommandItem
                    className="hover:cursor-pointer"
                    key={coin._id}
                    onClick={() => handleCoinClick(coin._id)}
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="mr-2">{coin.name}</span>
                    <div className={getColorClass(coin.price_change_24h)}>
                      {getChangePercentage(
                        coin.price_change_24h,
                        coin.current_price
                      )}
                    </div>
                    <CommandShortcut>
                      <TiPlus />
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      ) : (
        <CommandList>
          {loading ? (
            <div>Loading...</div>
          ) : suggestions.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              <CommandGroup heading="Suggestions">
                {suggestions.map((coin: any) => (
                  <CommandItem
                    className="hover:cursor-pointer"
                    key={coin._id}
                    onClick={() => handleCoinClick(coin._id)}
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="mr-2">{coin.name}</span>
                    <div className={getColorClass(coin.price_change_24h)}>
                      {getChangePercentage(
                        coin.price_change_24h,
                        coin.current_price
                      )}
                    </div>
                    <CommandShortcut>
                      <TiPlus />
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Trending Coins">
                {trendings.map((coin: any) => (
                  <CommandItem
                    className="hover:cursor-pointer"
                    key={coin._id}
                    onClick={() => handleCoinClick(coin._id)}
                  >
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2 h-4 w-4 cursor-pointer"
                    />
                    <span className="mr-2 cursor-pointer">{coin.name}</span>
                    <div
                      className={`${getColorClass(
                        coin.price_change_24h
                      )} cursor-pointer`}
                    >
                      {getChangePercentage(
                        coin.price_change_24h,
                        coin.current_price
                      )}
                    </div>
                    <CommandShortcut>
                      <TiPlus />
                    </CommandShortcut>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}
        </CommandList>
      )}
    </>
  );
};

export default CoinSearchDialog;
