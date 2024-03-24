import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const getDevice = async (id, signal) => {
  const response = await axios.get(`${apiUrl}/devices/${id}`, {
    signal,
  });
  return response.data;
};
