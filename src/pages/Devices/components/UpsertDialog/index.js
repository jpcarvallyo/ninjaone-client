import React from "react";
import { useTranslation } from "react-i18next";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { validationSchema } from "./validationSchema";
import { InputLabel } from "./InputLabel";
import Button from "../../../../ui-kit/Button";
import { OS } from "../../../../utils/";
import useCreateDevice from "../../../../api/devices/mutations/useCreateDevice";
import useUpdateDevice from "../../../../api/devices/mutations/useUpdateDevice";

export const UpsertDialog = ({ open, handleClose, id }) => {
  const {
    postData,
    data: createDeviceDataResponse,
    loading: createDeviceDataLoading,
    error: createDeviceDataError,
  } = useCreateDevice();
  const {
    updateDeviceData,
    data: updateDeviceDataResponse,
    loading: updateDeviceDataLoading,
    error: updateDeviceDataError,
  } = useUpdateDevice();
  const { t } = useTranslation();
  const osOptions = Object.values(OS);

  const handleSubmit = async (values) => {
    try {
      // Create
      if (id === "") {
        await postData(values);
        console.log(createDeviceDataResponse);
      } else {
        // Update
        await updateDeviceData(id, values);
        console.log("updateDeviceDataResponse: ", updateDeviceDataResponse);
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
        <DialogTitle>
          {id === "" ? t("addDevice") : t("editDevice")}
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

      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            deviceType: "",
            hddCapacity: "",
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleChange, values, isValid }) => (
            <Form>
              <div>
                <InputLabel htmlFor={"name"} text={"Name"} required={true} />
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
                />
              </div>
              <div>
                <InputLabel
                  htmlFor={"deviceType"}
                  text={"Device type"}
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
                >
                  {osOptions.map((os) => (
                    <MenuItem key={os} value={os}>
                      {os}
                    </MenuItem>
                  ))}
                </Field>
                {touched.deviceType && errors.deviceType && (
                  <div>{errors.deviceType}</div>
                )}
              </div>
              <div>
                <InputLabel
                  htmlFor={"hddCapacity"}
                  text={"HDD capacity (GB)"}
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
                />
              </div>

              <DialogActions>
                <Button
                  onClick={handleClose}
                  text={"Close"}
                  variant={"secondary"}
                />
                <Button
                  type="submit"
                  autoFocus
                  text={"Submit"}
                  disabled={!isValid}
                >
                  Submit
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};
