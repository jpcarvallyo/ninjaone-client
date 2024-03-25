import React, { useContext } from "react";
import { Skeleton, List } from "@mui/material";
import DeviceListItem from "../DeviceListItem";
import DevicePageContext from "../../DeviceContext";

const DeviceList = () => {
  const { loading, sortedAndFilteredDeviceList, handleDeviceItemClick } =
    useContext(DevicePageContext);

  if (loading) {
    return (
      <List data-testid="loading-skeleton">
        {[1, 2, 3, 4, 5, 6, 7].map((index) => (
          <Skeleton key={index} variant="text" height={52} />
        ))}
      </List>
    );
  } else {
    return (
      <List
        sx={{
          width: "100%",
          borderTop: "1px solid #CBCFD3",
          paddingTop: "0",
        }}
      >
        {sortedAndFilteredDeviceList.map((device) => (
          <DeviceListItem
            key={device.id}
            device={device}
            handleDeviceItemClick={handleDeviceItemClick}
          />
        ))}
      </List>
    );
  }
};

export default DeviceList;
