import React from "react";
import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getButtonStyles } from "./styles";

const Button = (props) => {
  const { icon, text, onClickHandler, variant = "", ...restProps } = props;
  const theme = useTheme();
  const buttonStyle = getButtonStyles(theme, variant);
  return (
    <MuiButton style={buttonStyle} onClick={onClickHandler} {...restProps}>
      {icon && <FontAwesomeIcon icon={icon} />}
      {text && (
        <span style={{ marginLeft: `${icon ? "5px" : ""}` }}>{text}</span>
      )}
    </MuiButton>
  );
};

export default Button;
