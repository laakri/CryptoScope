import { useState, useEffect } from "react";
import axios from "axios";
const userId = "6617eb2a53cc5242b41221ea";
const API_URL = "http://localhost:4401/api";
interface Coin {
  _id: string;
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

export const useCryptoService = () => {
  const [coins, setCoins] = useState<Coin[]>([]);

  useEffect(() => {
    const source = new EventSource(`${API_URL}/cryptos/updates`);

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
export const addToFavorites = async (coinId: string) => {
  const data = {
    coinId,
    userId,
  };
  try {
    await axios.post(`${API_URL}/favoriteCoins`, data);
    console.log("Coin added to favorites successfully");
  } catch (error) {
    console.error("Error adding coin to favorites:", error);
  }
};
export const getUserFavoriteCoins = async () => {
  try {
    const response = await axios.get(
      `${API_URL}/favoriteCoins/userFavoriteCoins/${userId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error getting user's favorite coins:", error);
    return [];
  }
};
export const DeleteFromFavorites = async (coinId: string) => {
  try {
    await axios.delete(`${API_URL}/favoriteCoins/${coinId}`);
    console.log("Coin deleted from favorites successfully");
  } catch (error) {
    console.error("Error deleted coin from favorites:", error);
  }
};
