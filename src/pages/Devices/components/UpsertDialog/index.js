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
import { validationSchema } from "./validationSchema";

export const UpsertDialog = ({ open, handleClose, id }) => {
  console.log("🚀 ~ UpsertDialog ~ id:", id);
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={handleClose}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <DialogTitle>
          {id === "" ? t("addDevice") : t("editDevice")}
        </DialogTitle>
      </Box>

      <DialogContent>
        <Formik
          initialValues={{ name: "", role: "", email: "" }}
          onSubmit={(values) => {
            console.log(values); // Handle form submission logic here
            handleClose();
          }}
          validationSchema={validationSchema}
        >
          {({ errors, touched, handleChange }) => (
            <Form>
              <div>
                <label htmlFor="name">Name</label>
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
                <label htmlFor="role">Role</label>
                <Field
                  id="role"
                  name="role"
                  as={Select}
                  variant="outlined"
                  fullWidth
                  error={touched.role && !!errors.role}
                  onChange={handleChange}
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="User">User</MenuItem>
                </Field>
                {touched.role && errors.role && <div>{errors.role}</div>}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  as={TextField}
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
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
