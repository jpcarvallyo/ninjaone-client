import axios from "axios";

export const updateDevice = (id, payload) => {
  return axios
    .put(`http://localhost:3000/devices/${id}`, payload)
    .then((response) => {
      // Handle successful response
      console.log("Response:", response.data);
      return response.data; // Return the data from the response
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
      throw error; // Rethrow the error to propagate it to the caller
    });
};
