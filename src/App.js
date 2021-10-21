import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material/styles";
import firebase from "firebase";

import Header from "./Header";
import SongDetail from "./SongDetail";
import Footer from "./Footer";
import SignInDialog from "./SignInDialog";
import Content from "./Content";
import Ranking from "./Ranking";
import Playlist from "./Playlist";
import MySnackbar from "./MySnackbar";
import DraggableTable from "./DraggableTable";

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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = React.useState(false);

  const signOut = () => {
    setSnackbarOpen(true);
    firebase.auth().signOut();
  };

  const closeSignInDialog = () => {
    setSignInDialogOpen(false);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setSnackbarOpen(true);
        setIsSignedIn(true);
        setUser(user);
      } else {
        setIsSignedIn(false);
        setUser({});
      }
    });
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <Header
            // reset={reset}
            isSignedIn={isSignedIn}
            user={user}
            setSignInDialogOpen={() => setSignInDialogOpen(true)}
            signOut={signOut}
          />
          <Switch>
            <Route path="/" exact>
              <Ranking
                isSignedIn={isSignedIn}
                setSignInDialogOpen={() => setSignInDialogOpen(true)}
              />
            </Route>
            <Route path="/track" exact>
              <Content
                isSignedIn={isSignedIn}
                setSignInDialogOpen={() => setSignInDialogOpen(true)}
              />
            </Route>
            <Route path="/user/:uid/playlist" exact>
              <Playlist
                isSignedIn={isSignedIn}
                setSignInDialogOpen={() => setSignInDialogOpen(true)}
              />
            </Route>
            <Route path="/user/:uid/playlist/:playlistId">
              <DraggableTable
                isSignedIn={isSignedIn}
                setSignInDialogOpen={() => setSignInDialogOpen(true)}
              />
            </Route>
            <Route path="/track/:spotify_id">
              <SongDetail />
            </Route>
          </Switch>
        </Router>
        <Footer />
        <MySnackbar
          snackbarOpen={snackbarOpen}
          setSnackbarOpen={setSnackbarOpen}
          message={isSignedIn ? "Sign In !" : "Sign Out !"}
        />
        <SignInDialog
          signInDialogOpen={signInDialogOpen}
          closeSignInDialog={closeSignInDialog}
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
