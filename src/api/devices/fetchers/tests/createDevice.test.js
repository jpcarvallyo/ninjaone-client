import axios from "axios";
import { createDevice } from "../createDevice";
import { mockCreateDeviceData, mockCreateDeviceDataResponse } from "./mockData";

jest.mock("axios");

describe("createDevice API call", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should create a new device", async () => {
    const payload = mockCreateDeviceData;

    const responseData = mockCreateDeviceDataResponse;

    axios.post.mockResolvedValueOnce({ data: responseData });

    const createdDevice = await createDevice(payload);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:3000/devices",
      payload
    );
    expect(createdDevice).toEqual(responseData);
  });
});
