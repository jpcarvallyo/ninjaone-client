import axios from "axios";
import { deleteDevice } from "../deleteDevice";

jest.mock("axios");

describe("deleteDevice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a device successfully", async () => {
    const responseData = { message: "Device deleted successfully" };

    axios.delete.mockResolvedValueOnce({ data: responseData });

    const deviceId = "device123";

    const signal = { aborted: false };

    const result = await deleteDevice(deviceId, signal);

    expect(axios.delete).toHaveBeenCalledWith(
      `http://localhost:3000/devices/${deviceId}`,
      { signal }
    );

    expect(result).toEqual(responseData);
  });
});
