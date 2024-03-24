import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography, Box } from "@mui/material";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { UpsertDialog } from "./components/UpsertDialog";
import NavBar from "../../ui-kit/NavBar";
import Button from "../../ui-kit/Button";
import { DeleteDialog } from "./components/DeleteDialog";
import DeviceList from "./components/DeviceList";
import ControlPanel from "./components/ControlPanel";
import ErrorBoundary from "../../ui-kit/ErrorBoundary";
import DevicePageContext from "./DeviceContext";

function Devices() {
  const {
    upsertDialogOpen,
    deleteDialogOpen,
    selectedDeviceId,
    addDeviceButtonHandler,
    handleUpsertDialogClose,
    handleDeleteDialogClose,
  } = useContext(DevicePageContext);

  const { t } = useTranslation();

  return (
    <Grid container>
      <NavBar />
      <ErrorBoundary>
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
          <ControlPanel />

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

          <DeviceList />
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
      </ErrorBoundary>
    </Grid>
  );
}

export default Devices;
