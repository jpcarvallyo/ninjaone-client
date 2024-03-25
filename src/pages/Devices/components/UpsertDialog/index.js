import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { validationSchema } from "./validationSchema";
import { useTheme } from "@mui/material/styles";
import { InputLabel } from "./InputLabel";
import Button from "ui-kit/Button";
import { OS } from "utils/";
import { useCreateDevice, useUpdateDevice } from "api/devices/mutations";
import { getDevice } from "api/devices/fetchers/getDevice";

export const UpsertDialog = ({ open, handleClose, id }) => {
  const [deviceData, setDeviceData] = useState(null);
  const theme = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDevice(id);
        setDeviceData(response);
      } catch (error) {
        throw new Error(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  const initialValues =
    deviceData && id !== ""
      ? {
          name: deviceData.system_name,
          deviceType: deviceData.type,
          hddCapacity: deviceData.hdd_capacity,
        }
      : {
          name: "",
          deviceType: "",
          hddCapacity: "",
        };

  const { postData } = useCreateDevice();
  const { updateDeviceData } = useUpdateDevice();
  const { t } = useTranslation();
  const osOptions = Object.values(OS);

  const handleSubmit = async (values) => {
    try {
      if (!id) {
        await postData(values);
        toast.success(t("toast.createSuccess"));
      } else {
        await updateDeviceData(id, values);
        toast.success(t("toast.editSuccess"));
      }
      handleClose();
    } catch (error) {
      throw new Error(error);
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
        <DialogTitle sx={{ fontSize: "24px" }}>
          {id === "" ? t("device.addDevice") : t("device.editDevice")}
        </DialogTitle>
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

      <DialogContent
        sx={{
          width: "450px",
          paddingTop: "5px",
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
          enableReinitialize={true}
        >
          {({ errors, touched, handleChange, values, isValid }) => (
            <Form>
              <Box sx={{ marginBottom: "10px" }}>
                <InputLabel
                  htmlFor={"name"}
                  text={t("device.systemName")}
                  required={true}
                />
                <Field
                  id="name"
                  name="name"
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  onChange={handleChange}
                  sx={{ marginTop: "6px", fontSize: "14px" }}
                />
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <InputLabel
                  htmlFor={"deviceType"}
                  text={t("device.type")}
                  required={true}
                />
                <Field
                  id="deviceType"
                  name="deviceType"
                  as={Select}
                  variant="outlined"
                  fullWidth
                  placeholder="Select type"
                  error={touched.deviceType && !!errors.deviceType}
                  onChange={handleChange}
                  value={values.deviceType}
                  sx={{
                    marginTop: "6px",
                    height: "38px",
                    marginBottom: "8px",
                    fontSize: "14px",
                  }}
                >
                  {osOptions
                    .filter((os) => os !== "All")
                    .map((os) => (
                      <MenuItem key={os} value={os} sx={{ fontSize: "14px" }}>
                        {os}
                      </MenuItem>
                    ))}
                </Field>
                {touched.deviceType && errors.deviceType && (
                  <Typography
                    sx={{
                      typography: "inputError",
                      color: theme.palette.red.secondary,
                    }}
                  >
                    {errors.deviceType}
                  </Typography>
                )}
              </Box>
              <Box sx={{ marginBottom: "10px" }}>
                <InputLabel
                  htmlFor={"hddCapacity"}
                  text={t("device.hddCapacity")}
                  required={true}
                />
                <Field
                  id="hddCapacity"
                  name="hddCapacity"
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={touched.hddCapacity && !!errors.hddCapacity}
                  helperText={touched.hddCapacity && errors.hddCapacity}
                  onChange={handleChange}
                  sx={{ marginTop: "6px", fontSize: "14px" }}
                />
              </Box>

              <DialogActions sx={{ position: "relative", right: "-8px" }}>
                <Button
                  onClick={handleClose}
                  text={t("close")}
                  variant={"secondary"}
                  data-testid="close-btn"
                />
                <Button
                  type="submit"
                  autoFocus
                  text={"Submit"}
                  variant={"primary"}
                  disabled={!isValid}
                >
                  {t("submit")}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
