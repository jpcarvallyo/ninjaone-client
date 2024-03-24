import axios from "axios";
import { getDevice } from "../getDevice";
import { mockDeviceData } from "./mockData";

jest.mock("axios");

describe("getDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch device data successfully", async () => {
    const responseData = mockDeviceData;

    axios.get.mockResolvedValueOnce({ data: responseData });

    const deviceId = "ppRmcE9p8";

    const signal = { aborted: false };

    const result = await getDevice(deviceId, signal);

    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:3000/devices/${deviceId}`,
      { signal }
    );

    expect(result).toEqual(responseData);
  });
});
