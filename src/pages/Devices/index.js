import { useTranslation } from "react-i18next";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import useGetDeviceList from "../../api/devices/queries/useGetDeviceList";
import NavBar from "../../common/NavBar";
import Button from "../../common/Button";

function Devices() {
  const { t } = useTranslation();
  const theme = useTheme();
  const { deviceList } = useGetDeviceList();
  //   console.log(deviceList);
  const onClickHandler = () => {
    console.log("clicked button");
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
          text="Add device"
          onClickHandler={onClickHandler}
        />
      </Grid>
    </Grid>
  );
}

export default Devices;
