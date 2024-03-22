import React from "react";
import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = ({ icon, text, onClickHandler }) => {
  const theme = useTheme();

  return (
    <MuiButton
      style={{
        backgroundColor: theme.palette.blue.secondary,
        color: theme.palette.white.main,
        fontSize: theme.typography.button.fontSize,
      }}
      onClick={onClickHandler}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text && <span style={{ marginLeft: "5px" }}>{text}</span>}
    </MuiButton>
  );
};

export default Button;
