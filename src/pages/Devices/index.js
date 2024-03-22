import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
    setSelectedDeviceId(id); // Update selectedDeviceId immediately
    if (type === "edit") {
      setUpsertDialogOpen(true);
    } else {
      setDeleteDialogOpen(true);
    }
  };

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
          onClickHandler={addDeviceButtonHandler}
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
        {deviceList &&
          deviceList.map((device) => (
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
