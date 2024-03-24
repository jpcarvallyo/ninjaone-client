import axios from "axios";
import { getDeviceList } from "../getDeviceList";
import { mockDeviceList } from "./mockData";

jest.mock("axios");

describe("getDeviceList", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch device list successfully", async () => {
    const responseData = mockDeviceList;
    axios.get.mockResolvedValueOnce({ data: responseData });

    const signal = { aborted: false };

    const result = await getDeviceList(signal);

    expect(axios.get).toHaveBeenCalledWith(`http://localhost:3000/devices`, {
      signal,
    });

    expect(result).toEqual(responseData);
  });
});
