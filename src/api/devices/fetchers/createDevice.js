import axios from "axios";

export const createDevice = async (payload) => {
  try {
    const response = await axios.post("http://localhost:3000/devices", payload);
    // Handle successful response
    return response.data;
  } catch (error) {
    // Handle error
    console.error("Error:", error);
    throw error; // Rethrow the error
  }
};
