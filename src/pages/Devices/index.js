import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  Select,
  MenuItem,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OS } from "../../utils/constants/osConstants";
import useGetDeviceList from "../../api/devices/queries/useGetDeviceList";
import { UpsertDialog } from "./components/UpsertDialog";
import NavBar from "../../ui-kit/NavBar";
import Button from "../../ui-kit/Button";
import { DeleteDialog } from "./components/DeleteDialog";
import DeviceLogo from "./components/DeviceLogo";
import EditDeleteMenu from "./components/EditDeleteMenu.js";

function Devices() {
  const [upsertDialogOpen, setUpsertDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [filters, setFilters] = useState({ type: [OS.ALL], capacity: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const { deviceList, loading } = useGetDeviceList(refreshList);

  useEffect(() => {
    // Reset the refreshList state after refetching the list
    setRefreshList(false);
  }, [deviceList]); // Trigger effect when deviceList changes

  const addDeviceButtonHandler = () => {
    setSelectedDeviceId(""); // Reset selectedDeviceId when adding a new device
    setUpsertDialogOpen(true);
  };

  const handleUpsertDialogClose = () => {
    setUpsertDialogOpen(false);
    setSelectedDeviceId("");
    setRefreshList(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedDeviceId("");
    setRefreshList(true);
  };

  const handleDeviceItemClick = (id, type) => {
    setSelectedDeviceId(id);
    if (type === "edit") {
      setUpsertDialogOpen(true);
    } else {
      setDeleteDialogOpen(true);
    }
  };

  const handleFilterChange = (filterName, value) => {
    let updatedValue = value;
    console.log("🚀 ~ handleFilterChange ~ updatedValue:", updatedValue);

    if (value.includes(OS.ALL) && value.length > 1) {
      // If "All" option is selected along with other options, remove "All" option
      updatedValue = value.filter((option) => option !== OS.ALL);
    } else if (value.length === 0) {
      // If all options are deselected, set the filter to only "All"
      updatedValue = [OS.ALL];
    }

    setFilters({ ...filters, [filterName]: updatedValue });
  };

  // Filter the device list based on filters and search term
  const filteredDeviceList = useMemo(() => {
    let filteredList = deviceList || []; // Handle null deviceList

    // Filter by type if not "All"
    if (!filters.type.includes(OS.ALL)) {
      filteredList = filteredList.filter((device) =>
        filters.type.includes(device.type)
      );
    }

    // Filter by capacity
    if (filters.capacity) {
      filteredList = filteredList.filter(
        (device) => device.hdd_capacity === filters.capacity
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredList = filteredList.filter((device) =>
        device.system_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filteredList;
  }, [deviceList, filters, searchTerm]);

  return (
    <Grid container>
      <NavBar />
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">{t("devices")}</Typography>
        <Button
          icon={faPlus}
          text={t("addDevice")}
          variant={"primary"}
          onClick={addDeviceButtonHandler}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "24px",
          flexDirection: "column",
        }}
      >
        <Grid
          item
          sx={{
            display: "flex",
            paddingLeft: "16px",
            justifyContent: "flex-start",
          }}
        >
          <TextField
            // label="Search"
            placeholder="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiOutlinedInput-input": {
                height: "5px",
              },
            }}
          />

          <FormControl sx={{ minWidth: 120 }}>
            <Select
              labelId="demo-multiple-select-label"
              id="demo-multiple-select"
              multiple
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
              renderValue={(selected) =>
                selected.includes(OS.ALL)
                  ? "Device Type: All"
                  : `Device Type: ${selected.join(", ")}`
              }
              sx={{ height: "38px" }}
            >
              {Object.values(OS).map((os) => (
                <MenuItem
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  key={os}
                  value={os}
                >
                  {os}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid
          item
          sx={{
            marginLeft: "16px",
            marginTop: "20px",
            typography: "listHeading",
          }}
        >
          <Typography>{t("devices")}</Typography>
        </Grid>

        <List sx={{ width: "100%" }}>
          {filteredDeviceList.map((device) => (
            <ListItem key={device.id}>
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
                      {`${device.type} workstation - ${device.hdd_capacity} GB`}
                    </Typography>
                  }
                />
              </Box>

              <ListItemSecondaryAction>
                <EditDeleteMenu
                  itemId={device.id}
                  handleDeviceItemClick={handleDeviceItemClick}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Grid>
      <UpsertDialog
        open={upsertDialogOpen}
        handleClose={handleUpsertDialogClose}
        id={selectedDeviceId}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        handleClose={handleDeleteDialogClose}
        id={selectedDeviceId}
      />
    </Grid>
  );
}

export default Devices;
