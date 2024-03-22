import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import { validationSchema } from "./validationSchema";

export const UpsertDialog = ({ open, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Dialog Title</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={{ name: "", email: "" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values); // Handle form submission logic here
            handleClose();
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div>
                <Field
                  name="name"
                  as={TextField}
                  label="Name"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={touched.name && !!errors.name} // Show error if touched and error exists
                  helperText={touched.name && errors.name} // Show helper text if touched and error exists
                />
              </div>
              <div>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  error={touched.email && !!errors.email} // Show error if touched and error exists
                  helperText={touched.email && errors.email} // Show helper text if touched and error exists
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
