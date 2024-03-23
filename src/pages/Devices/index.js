import React, { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormGroup,
  FormControlLabel,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OS } from "../../utils/constants/osConstants";

import useGetDeviceList from "../../api/devices/queries/useGetDeviceList";
import { UpsertDialog } from "./components/UpsertDialog";
import NavBar from "../../ui-kit/NavBar";
import Button from "../../ui-kit/Button";
import { DeleteDialog } from "./components/DeleteDialog";

function Devices() {
  const [upsertDialogOpen, setUpsertDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [filters, setFilters] = useState({ type: [], capacity: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();
  const theme = useTheme();
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

  // Function to handle filter change
  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  // Filter the device list based on filters and search term
  const filteredDeviceList = useMemo(() => {
    let filteredList = deviceList || []; // Handle null deviceList

    // Filter by type
    if (filters.type.length > 0) {
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
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* Filter form */}
        <Box sx={{ marginBottom: "1rem" }}>
          <TextField
            label="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl sx={{ marginLeft: "1rem" }}>
            <InputLabel>Filter Type</InputLabel>
            <Select
              multiple
              value={filters.type}
              onChange={(e) => handleFilterChange("type", e.target.value)}
            >
              {Object.values(OS).map((os) => (
                <MenuItem key={os} value={os}>
                  {os}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Display filtered device list */}
        {filteredDeviceList.map((device) => (
          <Box key={device.id} sx={{ display: "flex" }}>
            <Typography variant="h1">{device.system_name}</Typography>
            <Typography variant="h1">{device.type}</Typography>
            <Typography variant="h1">{device.hdd_capacity}</Typography>
            <Button
              text={"edit"}
              onClick={() => handleDeviceItemClick(device.id, "edit")}
            />
            <Button
              text={"delete"}
              onClick={() => handleDeviceItemClick(device.id, "delete")}
            />
          </Box>
        ))}
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
