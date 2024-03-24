import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const deleteDevice = async (id, signal) => {
  const response = await axios.delete(`${apiUrl}/devices/${id}`, {
    signal,
  });
  return response.data;
};
