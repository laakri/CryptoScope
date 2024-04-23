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
import { debounce } from "lodash";

const CoinSearchDialog: React.FC = () => {
  const [suggestions, setSuggestions] = React.useState<any>([]);
  const [trendings, setTrendings] = React.useState<any>([]);
  const [seachedData, setSearchedData] = React.useState<any>([]);
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

  const debounceDelay = 300; // Adjust this value as needed

  const debouncedSearch = debounce((query: string) => {
    handleSearch(query);
  }, debounceDelay);

  const handleSearch = async (query: string) => {
    try {
      setSearching(query !== "");

      const results = await searchCoins(query);
      setSearchedData(results);
    } catch (error) {
      console.error("Error searching for coins:", error);
    }
  };

  const debouncedHandleSearch = (query: string) => {
    debouncedSearch(query);
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
          ) : seachedData.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <>
              <CommandGroup heading="Suggestions">
                {seachedData.map((coin: any) => (
                  <CommandItem key={coin.name}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="mr-2 ">{coin.name}</span>
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
                  <CommandItem key={coin.name}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="mr-2 ">{coin.name}</span>
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
                  <CommandItem key={coin.name}>
                    <img
                      src={coin.image}
                      alt={coin.name}
                      className="mr-2 h-4 w-4"
                    />
                    <span className="mr-2 ">{coin.name}</span>
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
      )}
    </>
  );
};

export default CoinSearchDialog;
