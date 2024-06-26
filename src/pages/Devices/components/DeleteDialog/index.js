import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import Button from "ui-kit/Button";
import useGetDevice from "api/devices/queries/useGetDevice";
import { useDeleteDeviceData } from "api/devices/mutations/";

export const DeleteDialog = ({ open, handleClose, id }) => {
  const { data } = useGetDevice(id);
  const { deleteDeviceData } = useDeleteDeviceData(id);

  const { t } = useTranslation();

  const handleSubmit = async () => {
    try {
      const deleteDataResponse = await deleteDeviceData(id);
      if (deleteDataResponse) {
        toast.success(t("toast.deleteDeviceSuccess"));
      } else {
        toast.error(t("toast.deleteDeviceError"));
      }

      handleClose();
    } catch (error) {
      console.error("Error while posting device:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <DialogTitle>{t("delete.device")}?</DialogTitle>
        <FontAwesomeIcon
          icon={faClose}
          style={{
            marginRight: "24px",
            marginBottom: "10px",
            color: "#211F33",
            fontWeight: 300,
            cursor: "pointer",
          }}
          onClick={handleClose}
        />
      </Box>

      <DialogContent>
        {data ? (
          <Typography>
            {t("delete.warning")}{" "}
            <Typography
              component="span"
              style={{ display: "inline" }}
              fontWeight={"bold"}
            >
              {data.system_name}
            </Typography>
            . {t("delete.inform")}
          </Typography>
        ) : null}

        <DialogActions>
          <Button
            onClick={handleClose}
            text={t("cancel")}
            variant={"default"}
          />
          <Button
            type="submit"
            autoFocus
            text={t("delete.string")}
            variant={"warning"}
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};
