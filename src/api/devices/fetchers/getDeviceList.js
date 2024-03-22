import axios from "axios";

export const getDeviceList = async (signal) => {
  const response = await axios.get(`http://localhost:3000/devices`, { signal });
  return response.data;
};
