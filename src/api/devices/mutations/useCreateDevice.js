import { useState } from "react";
import { createDevice } from "../fetchers/createDevice";
import { shapeFormDataForPost } from "../utils";

const useCreateDevice = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const postData = async (formBody) => {
    try {
      setLoading(true);
      const payload = shapeFormDataForPost(formBody);
      const response = await createDevice(payload);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  return { postData, data, loading, error };
};

export default useCreateDevice;
