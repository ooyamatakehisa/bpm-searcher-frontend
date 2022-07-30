import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Box } from "@mui/material";
import { useSnackbar } from "notistack";
import firebase from "firebase";

import Header from "./Header";
import SongDetail from "./SongDetail";
import Footer from "./Footer";
import SignInDialog from "./SignInDialog";
import Content from "./Content";
import Ranking from "./Ranking";
import Playlist from "./Playlist";
import DraggableTable from "./DraggableTable";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentWrap: {
    flex: 1,
  },
}));

export default function Main() {
  const classes = useStyles();
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isLoadingSignIn, setIsLoadingSignIn] = useState(true);
  const [user, setUser] = useState(false);
  const [signInDialogOpen, setSignInDialogOpen] = React.useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const signOut = () => {
    enqueueSnackbar("Sign Out !");
    firebase.auth().signOut();
  };

  const closeSignInDialog = () => {
    setSignInDialogOpen(false);
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        enqueueSnackbar("Sign In !");
        setIsSignedIn(true);
        setUser(user);
      } else {
        setIsSignedIn(false);
        setUser({});
      }
      setIsLoadingSignIn(false);
    });
  }, [enqueueSnackbar]);

  return (
    <div className={classes.pageContainer}>
      <div className={classes.contentWrap}>
        <Router>
          <Header
            // reset={reset}
            isSignedIn={isSignedIn}
            user={user}
            setSignInDialogOpen={() => setSignInDialogOpen(true)}
            signOut={signOut}
          />
          <Switch>
            <Box width={0.9} maxWidth="1100px" mx="auto">
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
                  isLoadingSignIn={isLoadingSignIn}
                />
              </Route>
              <Route path="/user/:uid/playlist/:playlistId">
                <DraggableTable
                  isSignedIn={isSignedIn}
                  isLoadingSignIn={isLoadingSignIn}
                />
              </Route>
              <Route path="/track/:spotify_id">
                <SongDetail />
              </Route>
            </Box>
          </Switch>
        </Router>
      </div>
      <Footer />
      <SignInDialog
        signInDialogOpen={signInDialogOpen}
        closeSignInDialog={closeSignInDialog}
      />
    </div>
  );
}
