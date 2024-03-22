import { useEffect, useState, useMemo } from "react";
import { getDeviceList } from "../fetchers/getDeviceList"; // Import API function

const useGetDeviceList = (refreshList) => {
  const [deviceList, setDeviceList] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchDeviceList = async () => {
      try {
        setLoading(true);
        const deviceListData = await getDeviceList(signal); // Pass signal to fetcher function
        setDeviceList(deviceListData);
        setLoading(false);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Request was cancelled");
        } else {
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchDeviceList();

    // Cleanup function
    return () => {
      abortController.abort(); // Cancel the request when the component unmounts or when the dependency of the effect changes
    };
  }, [refreshList]); // Include refreshList as a dependency

  const memoizedDeviceList = useMemo(() => deviceList, [deviceList]);

  return { deviceList: memoizedDeviceList, loading, error };
};

export default useGetDeviceList;
