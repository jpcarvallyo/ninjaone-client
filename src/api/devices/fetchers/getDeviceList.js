import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const getDeviceList = async (signal) => {
  const response = await axios.get(`${apiUrl}/devices`, { signal });
  return response.data;
};
