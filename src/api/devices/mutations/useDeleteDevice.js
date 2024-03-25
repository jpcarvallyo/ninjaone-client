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
      return response;
    } catch (error) {
      setError(error);
      setLoading(false);
      throw error;
    }
  };

  return { deleteDeviceData, loading, error };
};

export default useDeleteDeviceData;
