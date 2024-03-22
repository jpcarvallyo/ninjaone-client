import axios from "axios";

export const createDevice = async (payload) => {
  const response = await axios
    .post("http://localhost:3000/devices", payload)
    .then((response) => {
      // Handle successful response
      console.log("Response:", response.data);
    })
    .catch((error) => {
      // Handle error
      console.error("Error:", error);
    });
  return response.data;
};
