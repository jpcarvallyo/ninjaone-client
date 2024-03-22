import React from "react";
import { Button as MuiButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Button = (props) => {
  const { icon, text, onClickHandler, variant = "", ...restProps } = props;
  const theme = useTheme();
  const primaryStyle = {
    backgroundColor: theme.palette.blue.secondary,
    color: theme.palette.white.main,
    fontSize: theme.typography.button.fontSize,
  };

  const secondaryVariantStyle = {
    backgroundColor: theme.palette.white.main,
    border: `1px solid ${theme.palette.grey.secondary}`,
    color: theme.palette.blue.secondary,
    fontSize: theme.typography.button.fontSize,
  };
  return (
    <MuiButton
      style={variant === "secondary" ? secondaryVariantStyle : primaryStyle}
      onClick={onClickHandler}
      {...restProps}
    >
      {icon && <FontAwesomeIcon icon={icon} />}
      {text && (
        <span style={{ marginLeft: `${icon ? "5px" : ""}` }}>{text}</span>
      )}
    </MuiButton>
  );
};

export default Button;
