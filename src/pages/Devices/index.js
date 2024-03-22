import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useGetDeviceList from "../../api/devices/queries/useGetDeviceList";
import { UpsertDialog } from "./components/UpsertDialog";
import NavBar from "../../ui-kit/NavBar";
import Button from "../../ui-kit/Button";
import { DeleteDialog } from "./components/DeleteDialog";

function Devices() {
  const [upsertDialogOpen, setUpsertDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(true);
  const [selectedDeviceId, setSelectedDeviceId] = useState("QF-NFxnDl");
  const { t } = useTranslation();
  const theme = useTheme();
  const { deviceList } = useGetDeviceList();
  //   console.log(deviceList);
  const addDeviceButtonHandler = () => {
    setUpsertDialogOpen(true);
  };

  const handleUpsertDialogClose = () => {
    setUpsertDialogOpen(false);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
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
