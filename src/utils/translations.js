import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      devices: "Devices",
      edit: "Edit",
      name: "Name",
      search: "Search",
      all: "All",
      device: {
        addDevice: "Add device",
        editDevice: "Edit device",
        systemName: "System name",
        type: "Device type",
        hddCapacity: "HDD capacity (GB)",
      },
      sortBy: {
        string: "Sort By",
        ascending: "Ascending",
        descending: "Descending",
        hddCapacity: "HDD Capacity",
      },
      cancel: "Cancel",
      close: "Close",
      submit: "Submit",
      delete: {
        string: "Delete",
        device: "Delete device",
        warning: "You are about to delete the device",
        inform: "This action cannot be undone",
      },
      toast: {
        createError: "Device creation was unsuccessful",
        createSuccess: "Device was successfully created",
        editSuccess: "Device was successfully edited",
        deleteDeviceSuccess: "Deleted Device Successfully",
        deleteDeviceError: "Unable to delete device",
      },
    },
  },
  es: {
    translation: {
      devices: "Dispositivos",
      edit: "Editar",
      name: "Name",
      search: "Buscar",
      all: "Todo",
      device: {
        addDevice: "Añadir dispositivo",
        editDevice: "Editar dispositivo",
        systemName: "Nombre del sistema",
        type: "Tipo de dispositivo",
        hddCapacity: "Capacidad del disco duro (GB)",
      },
      sortBy: {
        string: "Sort ByOrdenar por",
        ascending: "Ascendente",
        descending: "Descendente",
        hddCapacity: "Capacidad del disco duro",
      },
      cancel: "Cancelar",
      close: "Cerca",
      submit: "Submit",
      delete: {
        string: "Borrar",
        device: "Eliminar dispositivo",
        warning: "Estás a punto de eliminar el dispositivo.",
        inform: "Esta acción no se puede deshacer",
      },
      toast: {
        createError: "La creación del dispositivo no fue exitosa",
        createSuccess:
          "Device was successfully createEl dispositivo fue creado exitosamented",
        editSuccess:
          "Device was successfully editeEl dispositivo se editó correctamented",
        deleteDeviceSuccess: "Dispositivo eliminado exitosamente",
        deleteDeviceError:
          "Unable to delete devicNo se puede eliminar el dispositivoe",
      },
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export { i18n };
