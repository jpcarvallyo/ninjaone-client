import React, { useContext } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  FormControl,
  Select,
  MenuItem,
  IconButton,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as RefreshLogo } from "assets/icons/Refresh.svg";
import { OS } from "utils/constants/osConstants";
import DevicePageContext from "../../DeviceContext";
import { useTranslation } from "react-i18next";
import { capitalizeWords } from "utils/capitalizeWords";

const ControlPanel = () => {
  const {
    searchTerm,
    setSearchTerm,
    filters,
    handleFilterChange,
    sortCriteria,
    handleSortChange,
    handleOnClickReset,
  } = useContext(DevicePageContext);
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
      id="control-panel"
    >
      <Box
        item
        sx={{
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <TextField
          placeholder={t("search")}
          variant="outlined"
          value={searchTerm}
          id="search-input"
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: "14px", color: "#88859E" }}
                />
              </InputAdornment>
            ),
          }}
          InputLabelProps={{
            style: { fontSize: "14px !important" },
          }}
          sx={{
            marginRight: "8px",
            color: "#88859E",
            "& .MuiOutlinedInput-input": {
              height: "5px",
            },
          }}
        />

        <FormControl sx={{ minWidth: 120, marginRight: "8px" }}>
          <Select
            labelId="demo-multiple-select-label"
            id="demo-multiple-select"
            multiple
            value={filters.type}
            onChange={(e) => handleFilterChange("type", e.target.value)}
            renderValue={(selected) =>
              selected.includes(OS.ALL)
                ? `${capitalizeWords(t("device.type"))}: ${t("all")}`
                : `${capitalizeWords(t("device.type"))}: ${selected.join(", ")}`
            }
            sx={{ height: "38px", fontSize: "14px" }}
          >
            {Object.values(OS).map((os) => (
              <MenuItem
                onChange={(e) => handleFilterChange("type", e.target.value)}
                key={os}
                value={os}
                sx={{ fontSize: "14px" }}
              >
                {os}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120, marginRight: "8px" }}>
          <Select
            value={`${sortCriteria.sortBy}-${sortCriteria.sortOrder}`}
            onChange={handleSortChange}
            name="sortBy"
            sx={{ height: "38px", fontSize: "14px" }}
          >
            <MenuItem value="name-asc" sx={{ fontSize: "14px" }}>
              {`${t("sortBy.string")}: ${t("name")} (${t("sortBy.ascending")})`}
            </MenuItem>
            <MenuItem value="name-desc" sx={{ fontSize: "14px" }}>
              {`${t("sortBy.string")}: ${t("name")} (${t(
                "sortBy.descending"
              )})`}
            </MenuItem>
            <MenuItem value="capacity-asc" sx={{ fontSize: "14px" }}>
              {`${t("sortBy.string")}: ${t("sortBy.hddCapacity")} (${t(
                "sortBy.ascending"
              )})`}
            </MenuItem>
            <MenuItem value="capacity-desc" sx={{ fontSize: "14px" }}>
              {`${t("sortBy.string")}: ${t("sortBy.hddCapacity")} (${t(
                "sortBy.descending"
              )})`}
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
      <IconButton
        onClick={handleOnClickReset}
        sx={{
          position: "relative",
          right: "-8px",
          "&:hover": { backgroundColor: "transparent" },
        }}
      >
        <RefreshLogo />
      </IconButton>
    </Box>
  );
};

export default ControlPanel;
