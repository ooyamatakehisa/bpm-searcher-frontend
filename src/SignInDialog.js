import React from "react";
import {
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import SignIn from "./SignIn";
import { APP_NAME } from "./constant";

export default function SignInDialog({ signInDialogOpen, closeSignInDialog }) {
  return (
    <Dialog
      open={signInDialogOpen}
      onClose={closeSignInDialog}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Sign In / Sign Up</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          You can create playlists and save songs to it if you sign in this
          system. You can also sync the playlists with Spotify playlists in future.
        </DialogContentText>
        <Box p={2}>
          <SignIn />
        </Box>
        <DialogContentText>
          {APP_NAME} uses the Firebase Authentication as login service and does
          not have any user information on its server.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeSignInDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
