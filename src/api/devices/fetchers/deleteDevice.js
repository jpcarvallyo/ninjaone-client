import axios from "axios";

export const deleteDevice = async (id, signal) => {
  const response = await axios.delete(`http://localhost:3000/devices/${id}`, {
    signal,
  });
  return response.data;
};
