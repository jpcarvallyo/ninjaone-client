import React from "react";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Box,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DeviceLogo from "../DeviceLogo";
import EditDeleteMenu from "../EditDeleteMenu.js";
import { capitalizeWords } from "utils/capitalizeWords";

const DeviceListItem = ({ device, handleDeviceItemClick }) => {
  const theme = useTheme();

  return (
    <ListItem
      key={device.id}
      sx={{
        paddingTop: "12px",
        borderBottom: "1px solid #E7E8EB",
        height: "58px",
        "&:hover": {
          bgcolor: theme.palette.grey.contrast,
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <DeviceLogo system={device.type} />
          <ListItemText
            sx={{ marginLeft: "5px" }}
            primary={
              <Typography sx={{ typography: "deviceListItemPrimary" }}>
                {device.system_name}
              </Typography>
            }
          />
        </Box>
        <ListItemText
          secondary={
            <Typography sx={{ typography: "deviceListItemSecondary" }}>
              {`${capitalizeWords(device.type)} workstation - ${
                device.hdd_capacity
              } GB`}
            </Typography>
          }
          sx={{ color: theme.palette.grey.o3, marginTop: "0" }}
        />
      </Box>

      <ListItemSecondaryAction>
        <EditDeleteMenu
          itemId={device.id}
          handleDeviceItemClick={handleDeviceItemClick}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DeviceListItem;
