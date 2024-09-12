import { Toaster } from "react-hot-toast";
import "./App.css";
import Views from "./views";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "@evanpatchouli/react-hooks-kit";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const theme = useTheme();
  const muiTheme = theme === "dark" ? darkTheme : lightTheme;
  return (
    <>
      <ThemeProvider theme={muiTheme}>
        <Views />
      </ThemeProvider>
      <Toaster />
    </>
  );
}

export default App;
