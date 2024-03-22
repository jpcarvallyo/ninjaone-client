import React from "react";
import { Field, ErrorMessage } from "formik";
import { InputLabel, MenuItem, Select } from "@mui/material";

const CustomSelectField = ({ label, options, ...props }) => (
  <div>
    <InputLabel htmlFor={props.name}>{label}</InputLabel>
    <Field name={props.name}>
      {({ field, form }) => (
        <Select
          {...field}
          {...props}
          error={form.touched[props.name] && form.errors[props.name]}
          variant="outlined"
          fullWidth
        >
          <MenuItem value="" disabled>
            {props.placeholder || "Select"} {/* Placeholder text */}
          </MenuItem>
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      )}
    </Field>
    <ErrorMessage name={props.name} component="div" style={{ color: "red" }} />
  </div>
);

export default CustomSelectField;
