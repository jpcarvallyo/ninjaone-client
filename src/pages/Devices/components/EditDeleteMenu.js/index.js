import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function EditDeleteMenu({ itemId, handleDeviceItemClick }) {
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
      >
        <FontAwesomeIcon icon={faEllipsis} />
      </IconButton>
      <Menu
        id={`menu-${itemId}`}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleMenuItemClick(itemId, "edit")}>
          {t("edit")}
        </MenuItem>
        <MenuItem onClick={() => handleMenuItemClick(itemId, "delete")}>
          {t("delete.string")}
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default EditDeleteMenu;
