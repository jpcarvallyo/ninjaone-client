import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      devices: "Devices",
      addDevice: "Add device",
      editDevice: "Edit device",
      cancel: "Cancel",
      delete: {
        string: "Delete",
        device: "Delete device",
        warning: "You are about to delete the device",
        inform: "This action cannot be undone",
      },
    },
  },
  es: {
    translation: {
      devices: "Dispositivos",
      addDevice: "Añadir dispositivo",
      editDevice: "editar dispositivo",
      delete: {
        device: "Eliminar dispositivo",
        warning: "You are about to delete the device",
        inform: "This action cannot be undone",
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
