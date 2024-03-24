import { ReactComponent as WindowsLogo } from "../../../../assets/icons/system/windows.svg";
import { ReactComponent as LinuxLogo } from "../../../../assets/icons/system/linux.svg";
import { ReactComponent as AppleLogo } from "../../../../assets/icons/system/apple.svg";
import { OS } from "../../../../utils/constants/osConstants";

export default function DeviceLogo({ system }) {
  switch (system) {
    case OS.WINDOWS: {
      return <WindowsLogo />;
    }
    case OS.MAC: {
      return <AppleLogo />;
    }
    case OS.LINUX: {
      return <LinuxLogo />;
    }
    default: {
      return null;
    }
  }
}
