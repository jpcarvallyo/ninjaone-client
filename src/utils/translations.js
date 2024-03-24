import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      devices: "Devices",
      hddCapacity: "HDD capacity (GB)",
      edit: "Edit",
      addDevice: "Add device",
      editDevice: "Edit device",
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
      hddCapacity: "Capacidad del disco duro (GB)",
      addDevice: "Añadir dispositivo",
      editDevice: "editar dispositivo",
      close: "Cerca",
      cancel: "Cancelar",
      submit: "Submit",
      delete: {
        string: "Borrar",
        device: "Eliminar dispositivo",
        warning: "Estás a punto de eliminar el dispositivo.",
        inform: "Esta acción no se puede deshacer",
      },
      toast: {
        deleteDeviceSuccess: "Dispositivo eliminado exitosamente",
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
