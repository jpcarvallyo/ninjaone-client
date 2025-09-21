import { useState, useEffect, useCallback } from "react";
import { getDevice } from "../fetchers/getDevice";

const useGetDeviceData = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDeviceData = useCallback(async () => {
    if (!id || id === "") {
      setData(null);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await getDevice(id);
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getDeviceData();
  }, [getDeviceData]);

  return { data, loading, error };
};

export default useGetDeviceData;
