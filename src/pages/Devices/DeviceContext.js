import React, { createContext, useState, useMemo, useEffect } from "react";
import { OS } from "utils/constants/osConstants";
import useGetDeviceList from "api/devices/queries/useGetDeviceList";
const DevicePageContext = createContext();

export const DevicePageProvider = ({ children }) => {
  const [upsertDialogOpen, setUpsertDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [filters, setFilters] = useState({ type: [OS.ALL], capacity: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: "name",
    sortOrder: "asc",
  });
  const { deviceList, loading } = useGetDeviceList(refreshList);
  const handleSortChange = (event) => {
    const { value } = event.target;
    const [sortBy, sortOrder] = value.split("-");
    setSortCriteria({ sortBy, sortOrder });
  };

  const addDeviceButtonHandler = () => {
    setSelectedDeviceId("");
    setUpsertDialogOpen(true);
  };

  const handleUpsertDialogClose = () => {
    setUpsertDialogOpen(false);
    setSelectedDeviceId("");
    setRefreshList(true);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
    setSelectedDeviceId("");
    setRefreshList(true);
  };

  const handleDeviceItemClick = (id, type) => {
    setSelectedDeviceId(id);
    if (type === "edit") {
      setUpsertDialogOpen(true);
    } else {
      setDeleteDialogOpen(true);
    }
  };

  const handleFilterChange = (filterName, value) => {
    let updatedValue = value;

    if (value.includes(OS.ALL) && value.length > 1) {
      // If "All" option is selected along with other options, remove "All" option
      updatedValue = value.filter((option) => option !== OS.ALL);
    } else if (value.length === 0) {
      // If all options are deselected, set the filter to only "All"
      updatedValue = [OS.ALL];
    }

    setFilters({ ...filters, [filterName]: updatedValue });
  };

  const handleOnClickReset = () => {
    setSortCriteria({
      sortBy: "name",
      sortOrder: "asc",
    });
    setFilters({ type: [OS.ALL], capacity: "" });
    setSearchTerm("");
  };

  const sortedAndFilteredDeviceList = useMemo(() => {
    let filteredList = deviceList ? [...deviceList] : [];

    // Filter by type if not "All"
    if (!filters.type.includes(OS.ALL)) {
      filteredList = filteredList.filter((device) =>
        filters.type.includes(device.type)
      );
    }

    // Filter by capacity
    if (filters.capacity) {
      filteredList = filteredList.filter(
        (device) => device.hdd_capacity === filters.capacity
      );
    }

    // Filter by search term
    if (searchTerm) {
      filteredList = filteredList.filter((device) =>
        device.system_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting logic
    filteredList.sort((a, b) => {
      if (sortCriteria.sortBy === "name") {
        return sortCriteria.sortOrder === "asc"
          ? a.system_name.localeCompare(b.system_name)
          : b.system_name.localeCompare(a.system_name);
      } else if (sortCriteria.sortBy === "capacity") {
        return sortCriteria.sortOrder === "asc"
          ? a.hdd_capacity - b.hdd_capacity
          : b.hdd_capacity - a.hdd_capacity;
      }
      return 0;
    });

    return filteredList;
  }, [deviceList, filters, searchTerm, sortCriteria]);

  useEffect(() => {
    setRefreshList(false);
  }, [deviceList]);

  return (
    <DevicePageContext.Provider
      value={{
        upsertDialogOpen,
        setUpsertDialogOpen,
        deleteDialogOpen,
        setDeleteDialogOpen,
        selectedDeviceId,
        setSelectedDeviceId,
        refreshList,
        setRefreshList,
        filters,
        setFilters,
        searchTerm,
        setSearchTerm,
        sortCriteria,
        handleSortChange,
        addDeviceButtonHandler,
        handleUpsertDialogClose,
        handleDeleteDialogClose,
        handleDeviceItemClick,
        handleFilterChange,
        handleOnClickReset,
        deviceList,
        loading,
        sortedAndFilteredDeviceList,
      }}
    >
      {children}
    </DevicePageContext.Provider>
  );
};

export default DevicePageContext;
