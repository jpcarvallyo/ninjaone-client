import axios from "axios";
const apiUrl = process.env.REACT_APP_BASE_URL;

export const updateDevice = (id, payload) => {
  return axios
    .put(`${apiUrl}/devices/${id}`, payload)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
};
