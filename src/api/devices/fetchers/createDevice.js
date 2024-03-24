import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const createDevice = async (payload) => {
  try {
    const response = await axios.post(`${apiUrl}/devices`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
