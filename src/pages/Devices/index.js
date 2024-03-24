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
  InputAdornment,
} from "@mui/material";
import { faPlus, faSearch } from "@fortawesome/free-solid-svg-icons";
import { OS } from "../../utils/constants/osConstants";
import useGetDeviceList from "../../api/devices/queries/useGetDeviceList";
import { UpsertDialog } from "./components/UpsertDialog";
import NavBar from "../../ui-kit/NavBar";
import Button from "../../ui-kit/Button";
import { DeleteDialog } from "./components/DeleteDialog";
import DeviceListItem from "./components/DeviceListItem";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Devices() {
  const [upsertDialogOpen, setUpsertDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [filters, setFilters] = useState({ type: [OS.ALL], capacity: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "name",
    sortOrder: "asc",
  });

  const { t } = useTranslation();
  const theme = useTheme();
  const { deviceList, loading } = useGetDeviceList(refreshList);

  useEffect(() => {
    setRefreshList(false);
  }, [deviceList]);

  const handleSortChange = (event) => {
    const { value } = event.target;
    const [sortBy, sortOrder] = value.split("-"); // Split value into sortBy and sortOrder
    setSortCriteria({ sortBy, sortOrder });
  };

  const addDeviceButtonHandler = () => {
    setSelectedDeviceId("");
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

    if (value.includes(OS.ALL) && value.length > 1) {
      // If "All" option is selected along with other options, remove "All" option
      updatedValue = value.filter((option) => option !== OS.ALL);
    } else if (value.length === 0) {
      // If all options are deselected, set the filter to only "All"
      updatedValue = [OS.ALL];
    }

    setFilters({ ...filters, [filterName]: updatedValue });
  };

  const sortedAndFilteredDeviceList = useMemo(() => {
    let filteredList = deviceList ? [...deviceList] : [];

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

    // Sorting logic
    filteredList.sort((a, b) => {
      if (sortCriteria.sortBy === "name") {
        return sortCriteria.sortOrder === "asc"
          ? a.system_name.localeCompare(b.system_name)
          : b.system_name.localeCompare(a.system_name);
      } else if (sortCriteria.sortBy === "capacity") {
        return sortCriteria.sortOrder === "asc"
          ? a.hdd_capacity - b.hdd_capacity
          : b.hdd_capacity - a.hdd_capacity;
      }
      return 0;
    });

    return filteredList;
  }, [deviceList, filters, searchTerm, sortCriteria]);

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
          padding: "16px",
          flexDirection: "column",
        }}
      >
        <Box
          item
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <TextField
            placeholder="Search"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <FontAwesomeIcon
                    icon={faSearch}
                    style={{ fontSize: "14px", color: "#88859E" }}
                  />
                </InputAdornment>
              ),
            }}
            sx={{
              marginRight: "8px",
              color: "#88859E",
              "& .MuiOutlinedInput-input": {
                height: "5px",
              },
            }}
          />

          <FormControl sx={{ minWidth: 120, marginRight: "8px" }}>
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
              sx={{ height: "38px", fontSize: "14px" }}
            >
              {Object.values(OS).map((os) => (
                <MenuItem
                  onChange={(e) => handleFilterChange("type", e.target.value)}
                  key={os}
                  value={os}
                  sx={{ fontSize: "14px" }}
                >
                  {os}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, marginRight: "8px" }}>
            <Select
              value={`${sortCriteria.sortBy}-${sortCriteria.sortOrder}`}
              onChange={handleSortChange}
              name="sortBy"
              sx={{ height: "38px", fontSize: "14px" }}
            >
              <MenuItem value="name-asc" sx={{ fontSize: "14px" }}>
                Name (Ascending)
              </MenuItem>
              <MenuItem value="name-desc" sx={{ fontSize: "14px" }}>
                Name (Descending)
              </MenuItem>
              <MenuItem value="capacity-asc" sx={{ fontSize: "14px" }}>
                Capacity (Ascending)
              </MenuItem>
              <MenuItem value="capacity-desc" sx={{ fontSize: "14px" }}>
                Capacity (Descending)
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box
          item
          sx={{
            marginLeft: "16px",
            marginTop: "20px",
            marginBottom: "8px",
            typography: "listHeading",
          }}
        >
          <Typography>{t("devices")}</Typography>
        </Box>

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
