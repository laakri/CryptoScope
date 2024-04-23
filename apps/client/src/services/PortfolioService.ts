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
