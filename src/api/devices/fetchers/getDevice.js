import axios from "axios";

export const getDevice = async (id, signal) => {
  const response = await axios.get(`http://localhost:3000/devices/${id}`, {
    signal,
  });
  return response.data;
};
