import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@mui/material/styles";

function EditDeleteMenu({ itemId, handleDeviceItemClick }) {
  const theme = useTheme();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (option, type) => {
    console.log(`Clicked on option ${option} for item ${itemId}`);
    handleDeviceItemClick(itemId, type);
    handleClose();
  };

  return (
    <Box>
      <IconButton
        aria-controls={`menu-${itemId}`}
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          borderRadius: "4px",
          "&:hover, &.Mui-focusVisible": {
            backgroundColor: theme.palette.grey.iconButton,
          },
        }}
      >
        <FontAwesomeIcon style={{ height: "14px" }} icon={faEllipsis} />
      </IconButton>
      <Menu
        id={`menu-${itemId}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          "& .MuiPaper-root": {
            border: "1px solid #48446940",
            boxShadow: "0px 2px 4px 0px #211F3326",
          },
        }}
      >
        <MenuItem
          sx={{ width: "120px", fontSize: "14px" }}
          onClick={() => handleMenuItemClick(itemId, "edit")}
        >
          {t("edit")}
        </MenuItem>
        <MenuItem
          sx={{
            width: "120px",
            color: theme.palette.red.main,
            fontSize: "14px",
          }}
          onClick={() => handleMenuItemClick(itemId, "delete")}
        >
          {t("delete.string")}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default EditDeleteMenu;
