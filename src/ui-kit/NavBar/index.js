import { AppBar, Toolbar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ReactComponent as HomeLogo } from "../../assets/logos/NinjaOneLogo.svg";

export default function NavBar() {
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        backgroundColor: theme.palette.blue.main,
        position: "relative",
        borderBottom: "1px solid #E8E8EA",
      }}
    >
      <Toolbar sx={{ marginLeft: "4px" }}>
        <HomeLogo />
      </Toolbar>
    </AppBar>
  );
}
