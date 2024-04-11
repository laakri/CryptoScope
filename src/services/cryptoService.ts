import { useState, useEffect } from "react";
// import axios from "axios";

const CRYPTO_URL = "http://localhost:4401/api";
interface Coin {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  ath: number;
  ath_change_percentage: number;
  ath_date: Date;
  atl: number;
  atl_change_percentage: number;
  atl_date: Date;
  roi: any;
  last_updated: Date;
}

const useCryptoService = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const source = new EventSource(`${CRYPTO_URL}/cryptos/updates`);

    source.onmessage = (event) => {
      try {
        const updatedCoins: Coin[] = JSON.parse(event.data);
        setCoins(updatedCoins);
      } catch (error) {
        console.error("Error parsing coin updates:", error);
      }
    };

    source.onerror = (error) => {
      console.error("Error with SSE connection:", error);
      source.close();
    };

    return () => {
      source.close();
    };
  }, []);

  return coins;
};

export default useCryptoService;
