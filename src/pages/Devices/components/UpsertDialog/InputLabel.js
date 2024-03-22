import { useTheme } from "@mui/material/styles";

export const InputLabel = ({ htmlFor, text, required = false }) => {
  const theme = useTheme();
  return (
    <label
      style={{
        color: theme.palette.black.secondary,
        fontSize: theme.typography.formInputLabel.fontSize,
        fontWeight: theme.typography.formInputLabel.fontWeight,
      }}
      htmlFor={htmlFor}
    >
      {text}
      <span style={{ marginLeft: "3px" }}>{required ? "*" : ""}</span>
    </label>
  );
};
