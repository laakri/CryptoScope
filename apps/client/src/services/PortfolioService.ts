import axios from "axios";

const API_URL = "http://localhost:4401/api/cryptosProfiles";

export const addTargetTable = async (userId: string) => {
  try {
    const response = await axios.post(`${API_URL}/CreateNewList`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating target table:", error);
    throw error;
  }
};

export const getTargetTablesByUserId = async (userId: string) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}/targetTables`);
    return response.data;
  } catch (error) {
    console.error("Error getting target tables by user ID:", error);
    throw error;
  }
};
export const updateTargetTableName = async (
  userId: string,
  targetTableId: string,
  name: string
) => {
  try {
    const response = await axios.patch(
      `${API_URL}/${userId}/targetTables/${targetTableId}`,
      { name }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating target table name:", error);
    throw error;
  }
};
export const getCoinSuggestions = async () => {
  try {
    const response = await axios.get(`${API_URL}/coins/suggestions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching coin suggestions:", error);
    throw error;
  }
};

export const searchCoins = async (query: string) => {
  try {
    const response = await axios.get(`${API_URL}/coins/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error("Error searching for coins:", error);
    throw error;
  }
};
export const addCoinToTargetTable = async (
  userId: string,
  targetTableId: string,
  name: string,
  isExistingCoin: boolean,
  price?: number
) => {
  try {
    const response = await axios.post(
      `${API_URL}/${userId}/targetTables/${targetTableId}/addCoin`,
      { name, price, isExistingCoin }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding coin to target table:", error);
    throw error;
  }
};
export const getTargetTableById = async (
  targetTableId: string,
  userId: string
) => {
  try {
    const response = await axios.get(`${API_URL}/${targetTableId}/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching target table by ID:", error);
    throw error;
  }
};

export const updateCoins = async (
  userId: string,
  targetTableId: string,
  coins: any[]
) => {
  const data = {
    userId,
    targetTableId,
    coins,
  };
  try {
    await axios.put(`${API_URL}/${targetTableId}/updateCoins`, data);
    console.log("Coins updated successfully");
  } catch (error) {
    console.error("Error updating coins:", error);
  }
};
