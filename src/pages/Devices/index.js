import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useGetDeviceList from "../../api/devices/queries/useGetDeviceList";
import { UpsertDialog } from "./components/UpsertDialog";
import NavBar from "../../ui-kit/NavBar";
import Button from "../../ui-kit/Button";

function Devices() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const { t } = useTranslation();
  const theme = useTheme();
  const { deviceList } = useGetDeviceList();
  //   console.log(deviceList);
  const addDeviceButtonHandler = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
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
          onClickHandler={addDeviceButtonHandler}
        />
      </Grid>
      <UpsertDialog
        open={dialogOpen}
        handleClose={handleDialogClose}
        id={selectedDeviceId}
      />
    </Grid>
  );
}

export default Devices;
