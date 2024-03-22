import { useState } from "react";
import { updateDevice } from "../fetchers/updateDevice";
import { shapeFormDataForPost } from "../utils";

const useUpdateDevice = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateDeviceData = async (id, formBody) => {
    try {
      setLoading(true);
      const payload = shapeFormDataForPost(formBody);
      const response = await updateDevice(id, payload);
      setData(response);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { updateDeviceData, data, loading, error };
};

export default useUpdateDevice;
