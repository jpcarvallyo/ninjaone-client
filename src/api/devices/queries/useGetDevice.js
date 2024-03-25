import { useState, useEffect } from "react";
import { getDevice } from "../fetchers/getDevice";

const useGetDeviceData = (id) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getDeviceData = async () => {
    try {
      setLoading(true);
      const response = await getDevice(id);
      setData(id === "" ? null : response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDeviceData(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { data, loading, error };
};

export default useGetDeviceData;
