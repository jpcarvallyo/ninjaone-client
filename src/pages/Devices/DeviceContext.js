import React, {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { OS } from "utils/constants/osConstants";
import { SORTING } from "utils/constants/";
import useGetDeviceList from "api/devices/queries/useGetDeviceList";

const DevicePageContext = createContext();

export const DevicePageProvider = ({ children, testOverrides }) => {
  const [upsertDialogOpen, setUpsertDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [refreshList, setRefreshList] = useState(false);
  const [filters, setFilters] = useState({ type: [OS.ALL], capacity: "" });
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState({
    sortBy: SORTING.NAME,
    sortOrder: SORTING.ASC,
  });
  const { deviceList, loading } = useGetDeviceList(refreshList);

  const handleSortChange = useCallback((event) => {
    const { value } = event.target;
    const [sortBy, sortOrder] = value.split("-");
    setSortCriteria({ sortBy, sortOrder });
  }, []);

  const addDeviceButtonHandler = useCallback(() => {
    setSelectedDeviceId("");
    setUpsertDialogOpen(true);
  }, []);

  const handleUpsertDialogClose = useCallback(() => {
    setUpsertDialogOpen(false);
    setSelectedDeviceId("");
    setRefreshList(true);
  }, []);

  const handleDeleteDialogClose = useCallback(() => {
    setDeleteDialogOpen(false);
    setSelectedDeviceId("");
    setRefreshList(true);
  }, []);

  const handleDeviceItemClick = useCallback((id, type) => {
    setSelectedDeviceId(id);
    if (type === "edit") {
      setUpsertDialogOpen(true);
    } else {
      setDeleteDialogOpen(true);
    }
  }, []);

  const handleFilterChange = useCallback((filterName, value) => {
    let updatedValue = value;

    if (value.includes(OS.ALL) && value.length > 1) {
      // If "All" option is selected along with other options, remove "All" option
      updatedValue = value.filter((option) => option !== OS.ALL);
    } else if (value.length === 0) {
      // If all options are deselected, set the filter to only "All"
      updatedValue = [OS.ALL];
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: updatedValue,
    }));
  }, []);

  const handleOnClickReset = useCallback(() => {
    setSortCriteria({
      sortBy: SORTING.NAME,
      sortOrder: SORTING.ASC,
    });
    setFilters({ type: [OS.ALL], capacity: "" });
    setSearchInput("");
    setSearchTerm("");
  }, []);

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
      if (sortCriteria.sortBy === SORTING.NAME) {
        return sortCriteria.sortOrder === SORTING.ASC
          ? a.system_name.localeCompare(b.system_name)
          : b.system_name.localeCompare(a.system_name);
      } else if (sortCriteria.sortBy === SORTING.CAPACITY) {
        return sortCriteria.sortOrder === SORTING.ASC
          ? a.hdd_capacity - b.hdd_capacity
          : b.hdd_capacity - a.hdd_capacity;
      }
      return 0;
    });

    return filteredList;
  }, [deviceList, filters, searchTerm, sortCriteria]);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchTerm(searchInput);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchInput]);

  useEffect(() => {
    if (refreshList) {
      setRefreshList(false);
    }
  }, [refreshList]);

  const contextValues = {
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
    searchInput,
    setSearchInput,
    searchTerm,
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
    ...testOverrides,
  };

  return (
    <DevicePageContext.Provider value={contextValues}>
      {children}
    </DevicePageContext.Provider>
  );
};

export default DevicePageContext;
