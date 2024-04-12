import axios from "axios";

const API_URL = "http://localhost:4401/api";

const addTargetTable = async (userId: string) => {
  try {
    const response = await axios.post(`${API_URL}/targetTables`, {
      userId,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating target table:", error);
    throw error;
  }
};

export { addTargetTable };
