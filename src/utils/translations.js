import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      devices: "Devices",
      addDevice: "Add device",
      editDevice: "Edit device",
    },
  },
  es: {
    translation: {
      devices: "Dispositivos",
      addDevice: "Añadir dispositivo",
      editDevice: "editar dispositivo",
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
