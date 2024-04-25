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
import {
  addCoinToTargetTable,
  getCoinSuggestions,
  searchCoins,
} from "@/services/PortfolioService";
import { RiCopperCoinLine } from "react-icons/ri";
import { FaSearchDollar } from "react-icons/fa";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useToast } from "@/components/ui/use-toast";
import { useUserStore } from "@/stores/user";
import { useParams, useNavigate } from "react-router-dom";

const CoinSearchDialog: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserStore();
  const [suggestions, setSuggestions] = React.useState<any>([]);
  const [trendings, setTrendings] = React.useState<any>([]);
  const [searchedData, setSearchedData] = React.useState<any>([]);
  const [loading, setLoading] = React.useState(true);
  const [searching, setSearching] = React.useState(false);
  const [showCustomCoinInput, setShowCustomCoinInput] = React.useState(false);
  const [customCoinName, setCustomCoinName] = React.useState("");
  const [customCoinNameError, setCustomCoinNameError] = React.useState("");
  const { id } = useParams<{ id: string }>();

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

  const handleCoinClick = async (coinId: any) => {
    if (user && id) {
      try {
        await addCoinToTargetTable(user.userId, id, coinId, true, 0);
        toast({
          description: "Coin added successfully!",
        });
        navigate(`/Portfolio/ListPage/${id}`);
      } catch (error) {
        console.error("Error adding the Coin:", error);
      }
    }
  };
  const handleAddCustomCoin = () => {
    setShowCustomCoinInput(true);
  };

  const handleCancelCustomCoin = () => {
    setShowCustomCoinInput(false);
  };

  const handleAddCustomCoinSubmit = async () => {
    if (user && id) {
      if (customCoinName.trim() !== "") {
        try {
          await addCoinToTargetTable(user.userId, id, customCoinName, false, 0);
        } catch (error) {
          console.error("Error adding the Coin:", error);
        }
        setShowCustomCoinInput(false);
        setCustomCoinName("");
        toast({
          description: "Custom coin added successfully!",
        });
        navigate(`/Portfolio/ListPage/${id}`);
      } else {
        setCustomCoinNameError("Please enter a valid coin name.");
      }
    }
  };

  const handleCustomCoinNameChange = (event: any) => {
    setCustomCoinName(event.target.value);
    setCustomCoinNameError("");
  };

  return (
    <div className=" relative">
      {showCustomCoinInput && (
        <div className=" w-56 z-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500">
          <Input
            type="text"
            placeholder="Enter custom coin name"
            value={customCoinName}
            onChange={handleCustomCoinNameChange}
            required
          />
          {customCoinNameError && (
            <p className="mt-1 text-sm text-red-500">{customCoinNameError}</p>
          )}
          <div className="flex justify-between mt-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleCancelCustomCoin}
              className="flex items-center gap-1 text-red-300 "
            >
              <MdKeyboardArrowLeft />
              Cancel
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center gap-1"
              onClick={handleAddCustomCoinSubmit}
            >
              Add Custom Coin
              <MdKeyboardArrowRight />
            </Button>
          </div>
        </div>
      )}
      <>
        <div
          className={showCustomCoinInput ? "blur-lg pointer-events-none" : ""}
        >
          <CommandInput
            placeholder="Type a coin or search..."
            onChange={(e: any) => handleSearch(e.target.value)}
          />
          <CommandList>
            <CommandGroup>
              <CommandItem
                className="hover:cursor-pointer flex gap-2 "
                onClick={() => handleAddCustomCoin()}
              >
                <RiCopperCoinLine />
                <div>Add Custom Coin</div>
                <CommandShortcut>
                  <FaSearchDollar />
                </CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
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
        </div>
      </>
    </div>
  );
};

export default CoinSearchDialog;
