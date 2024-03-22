import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  deviceType: Yup.string().required("Device type is required"),
  hddCapacity: Yup.number("Must be a number")
    .typeError("HDD capacity must be a number")
    .required("HDD capacity is required")
    .positive("HDD capacity must be a positive number"),
});
