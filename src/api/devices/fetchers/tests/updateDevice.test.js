import axios from "axios";
import { updateDevice } from "../updateDevice";
import { mockUpdateDeviceData } from "./mockData";

jest.mock("axios");

describe("updateDevice function", () => {
  it("should update a device successfully", async () => {
    axios.put.mockResolvedValueOnce({
      data: { message: "Device updated successfully" },
    });

    const id = "deviceId";
    const payload = mockUpdateDeviceData;

    const result = await updateDevice(id, payload);

    expect(result).toEqual({ message: "Device updated successfully" });
    expect(axios.put).toHaveBeenCalledWith(
      `http://localhost:3000/devices/${id}`,
      payload
    );
  });
});
