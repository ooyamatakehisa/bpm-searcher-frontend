import React from "react";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarProvider } from "notistack";

import Main from "./Main";

const theme = createTheme({
  palette: {
    primary: {
      main: "#da0047",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffffff",
      contrastText: "#a0a0a0",
    },
    textSecondary: {
      main: "#a0a0a0",
      contrastText: "#a0a0a0",
    },
  },
  typography: {
    fontFamily: ["Lato", "Raleway"].join(","),
  },
});

export const themeLogo = createTheme({
  palette: {
    primary: {
      main: "#da0047",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Bowlby One SC"].join(","),
  },
});

function App() {
  const notistackRef = React.createRef();
  const onClickDismiss = (key) => () => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          ref={notistackRef}
          action={(key) => (
            <IconButton
              aria-label="close"
              onClick={onClickDismiss(key)}
              color="secondary"
            >
              <CloseIcon />
            </IconButton>
          )}
        >
          <Main />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
