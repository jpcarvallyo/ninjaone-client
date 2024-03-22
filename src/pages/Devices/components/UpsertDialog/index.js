import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
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
import { OS } from "../../../../utils/";

export const UpsertDialog = ({ open, handleClose, id }) => {
  const { t } = useTranslation();
  const osOptions = Object.values(OS);
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
          }}
        />
      </Box>

      <DialogContent>
        <Formik
          initialValues={{
            name: "",
            deviceType: "",
            hddCapacity: "",
          }}
          onSubmit={(values) => {
            console.log(values); // Handle form submission logic here
            handleClose();
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleChange, values }) => (
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
                    <MenuItem value={os}>{os}</MenuItem>
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
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit" autoFocus>
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
