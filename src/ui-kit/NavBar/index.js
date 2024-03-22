import { AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as HomeLogo } from "../../assets/logos/NinjaOneLogo.svg";

export default function NavBar() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      style={{ backgroundColor: theme.palette.blue.main, position: "relative" }}
    >
      <Toolbar sx={{ marginLeft: "8px" }}>
        <HomeLogo />
      </Toolbar>
    </AppBar>
  );
}
