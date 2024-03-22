import { useState } from "react";
import { deleteDevice } from "../fetchers/deleteDevice";

const useDeleteDeviceData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deleteDeviceData = async (id) => {
    try {
      setLoading(true);
      const response = await deleteDevice(id);
      setLoading(false);
      return response; // Return the response here
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error; // Throw the error here
    }
  };

  return { deleteDeviceData, loading, error };
};

export default useDeleteDeviceData;
