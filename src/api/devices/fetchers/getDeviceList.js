import axios from "axios";

export const getDeviceList = async () => {
  const response = await axios.get(`http://localhost:3000/devices`);
  return response.data;
};
